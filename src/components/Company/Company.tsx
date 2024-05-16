import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useCompany } from "@/contexts/company-context";
import useUser from "@/contexts/user-contexts";
import { CreateCompanyDialog } from "../CreateCompanyDialog/CreateCompanyDialog";
import { useCompanies } from "@/custom-hooks/queries/company";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { TypographyH3 } from "../ui/typographyh3";

export const Company = () => {
  const { getCompanies, getCompanySelected, setCompanies, setLoading } =
    useCompany();

  const token = localStorage.getItem("token") as string;

  const { getUser } = useUser();

  const { data, isSuccess, isLoading } = useCompanies(token);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      setCompanies(data);
    }
  }, [isSuccess, data]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row justify-between items-center gap-2">
          {getCompanySelected() && (
            <Avatar>
              {getCompanySelected()?.logo && (
                <AvatarImage src={getCompanySelected()?.logo} />
              )}
              <AvatarFallback>
                {getCompanySelected()?.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          {getCompanySelected() && (
            <TypographyH3 className="text-sm font-medium">
              {getCompanySelected()?.name ?? getUser()?.name}
            </TypographyH3>
          )}
          {!getCompanySelected() && (
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                {getUser()?.profilePicture && (
                  <AvatarImage src={getUser()?.profilePicture} />
                )}
                <AvatarFallback>
                  {getUser()?.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <TypographyH3 className="text-sm font-medium">
                {getUser()?.name}
              </TypographyH3>
            </div>
          )}
          <ChevronsUpDown size={16} className="font-normal text-zinc-600" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] flex flex-col mx-auto gap-2">
        {getCompanies().map((company) => (
          <Link
            to={`/${company.slug}`}
            key={company.id}
            className="w-full"
          >
            <DropdownMenuItem className="w-full flex flex-row justify-between items-center gap-2">
              <div className="flex flex-row items-center gap-2">
                <Avatar>
                  {company.logo && <AvatarImage src={company.logo} />}
                  <AvatarFallback>
                    {company.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <TypographyH3 className="text-sm font-medium">
                  {company.name}
                </TypographyH3>
              </div>

              {getCompanySelected()?.id === company.id && (
                <CheckIcon size={16} className="font-normal text-zinc-600" />
              )}
            </DropdownMenuItem>
          </Link>
        ))}
        <div className="w-full flex flex-col items-center">
          <CreateCompanyDialog>
            <Button variant="outline" className="w-full">
              Criar empresa
            </Button>
          </CreateCompanyDialog>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
