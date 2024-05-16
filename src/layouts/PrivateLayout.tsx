import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutWithNavbar } from "./LayoutWithNavbar";
import useAuth from "@/contexts/auth-context";

interface IProps {
  component: ReactNode;
  hasNavbar: boolean;
  header: ReactNode;
  title?: string;
  className?: string;
}

export const PrivateLayout = ({
  component,
  hasNavbar,
  header,
  title,
  className,
}: IProps) => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  const { getIsLoggedIn } = useAuth();

  useEffect(() => {
    if (!getIsLoggedIn()) {
      navigate("/login");
    }
    setCompleted(true);
  }, [getIsLoggedIn()]);

  return (
    <>
      {hasNavbar && completed && (
        <LayoutWithNavbar title={title} header={header} className={className}>
          {component}
        </LayoutWithNavbar>
      )}
      {!hasNavbar && completed && component}
    </>
  );
};
