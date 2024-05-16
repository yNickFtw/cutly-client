import useAuth from "@/contexts/auth-context";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: IProps) => {
  const { getIsLoggedIn } = useAuth();
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (getIsLoggedIn()) {
      navigate("/");
    }
    
    setCompleted(true);
  }, [getIsLoggedIn()]);

  return <>{completed && children}</>;
};
