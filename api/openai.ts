import type { IncomingMessage, ServerResponse } from "http";

const OPENAI_BASE = "https://api.openai.com/v1";

const ALLOWED = ["/chat/completions", "/audio/speech", "/audio/transcriptions"];

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.writeHead(405, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.writeHead(500, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "OpenAI API key not configured" }));
  }

  // Parse body
  const rawBody = await new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });

  const contentType = req.headers["content-type"] || "";
  const isFormData = contentType.includes("multipart/form-data");

  let endpoint: string;
  let upstreamBody: BodyInit;
  let upstreamHeaders: Record<string, string>;

  if (isFormData) {
    // For transcriptions — forward raw multipart body as-is
    endpoint = "/audio/transcriptions";
    upstreamBody = rawBody;
    upstreamHeaders = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": contentType,
    };
  } else {
    const parsed = JSON.parse(rawBody.toString()) as { endpoint: string; [k: string]: unknown };
    endpoint = parsed.endpoint;
    const { endpoint: _ep, ...rest } = parsed;
    upstreamBody = JSON.stringify(rest);
    upstreamHeaders = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };
  }

  if (!endpoint || !ALLOWED.includes(endpoint)) {
    res.writeHead(403, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Endpoint not allowed" }));
  }

  const upstream = await fetch(`${OPENAI_BASE}${endpoint}`, {
    method: "POST",
    headers: upstreamHeaders,
    body: upstreamBody,
  });

  if (endpoint === "/audio/speech") {
    res.writeHead(upstream.status, { "Content-Type": "audio/mpeg" });
    const buffer = await upstream.arrayBuffer();
    return res.end(Buffer.from(buffer));
  }

  const data = await upstream.json();
  res.writeHead(upstream.status, { "Content-Type": "application/json" });
  return res.end(JSON.stringify(data));
}
