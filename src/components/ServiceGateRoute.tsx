import { ReactNode } from "react";

interface ServiceGateRouteProps {
  children: ReactNode;
  featureName?: string;
}

const ServiceGateRoute = ({ children }: ServiceGateRouteProps) => <>{children}</>;

export default ServiceGateRoute;
