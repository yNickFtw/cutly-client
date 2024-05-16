import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "@/contexts/auth-context";
import useUser from "@/contexts/user-contexts";
import { TypographyH2 } from "../ui/typographyh2";
import { useCompany } from "@/contexts/company-context";
import { DropdownUser } from "../DropdownUser/DropdownUser";
import { toast } from "../ui/use-toast";
import { Company } from "../Company/Company";

export const Navbar = () => {
  const [_, setActive] = useState<string>("");
  const { logout } = useAuth();
  const { getCompanySelected } = useCompany();

  const { user } = useUser();

  const windowPath = useLocation().pathname;

  useEffect(() => {
    setActive(windowPath);
  }, [windowPath]);

  const handleLogout = () => {
    toast({
      title: "Sessão encerrada",
      description: "Você foi desconectado da sua conta com sucesso",
    });
    logout();
  };

  return (
    <div
      className="w-full fixed top-0 left-0 right-0 flex flex-col border-b border-b-zinc-200 p-2"
      style={{
        backdropFilter: "blur(10px)",
      }}
    >
      <header className="max-w-[1200px] w-full mx-auto flex flex-row justify-between items-center py-4">
        <div className="flex flex-row items-center gap-2">
          <Link to="/">
            <TypographyH2 className="text-2xl font-extrabold">
              Cutly
            </TypographyH2>
          </Link>
          <span className="text-2xl text-gray-500">/</span>
          <Company />
        </div>

        <nav className="flex flex-row gap-4">
          <DropdownUser user={user} logout={handleLogout} />
        </nav>
      </header>
    </div>
  );
};
