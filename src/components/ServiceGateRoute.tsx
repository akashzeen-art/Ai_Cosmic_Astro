import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";

interface ServiceGateRouteProps {
  children: ReactNode;
  featureName?: string;
}

/**
 * Portal content requires an ACTIVE Hutch subscription (CP Login).
 * INACTIVE users are redirected at login; guests see the login prompt.
 */
const ServiceGateRoute = ({
  children,
  featureName = "this service",
}: ServiceGateRouteProps) => {
  const { isActive } = useAuth();

  if (!isActive) {
    return (
      <LoginPrompt
        featureName={featureName}
        description={`Please log in with your Hutch number to use ${featureName}. Inactive users will be redirected to subscribe.`}
      />
    );
  }

  return <>{children}</>;
};

export default ServiceGateRoute;
