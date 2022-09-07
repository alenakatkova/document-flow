import { useAuth } from "../contexts/authProvider";
import { useRouter } from "next/router";

import { useEffect, ReactNode } from "react";

interface RequireAuthProps {
  children : ReactNode;
}

const RequireAuth = ({ children } : RequireAuthProps) => {
  let { team } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!team) {
      router.push("/")
    }
  }, [team])

  if (team) {
    return <>{children}</>;
  }

  return <p>Redirecting...</p>
};

export default RequireAuth;