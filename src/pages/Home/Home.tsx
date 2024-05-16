import { useCompany } from "@/contexts/company-context";
import useUser from "@/contexts/user-contexts";
import { useEffect } from "react";
import { EmptyCompanies } from "./_components/EmptyCompanies";
import { CardCompany } from "./_components/CardCompany";

export const Home = () => {
  useEffect(() => {
    document.title = "Cutly - Dashboard";
  }, []);

  const { getUser } = useUser();

  const { getCompanies, setCompanySelected, getLoading } = useCompany();

  useEffect(() => {
    setCompanySelected(null);
  }, []);

  return (
    <>
      {!getLoading() && getCompanies().length < 1 && <EmptyCompanies />}

      <div className="flex flex-wrap gap-4">
        {!getLoading() &&
          getCompanies().map((company) => (
            <CardCompany key={company.id} company={company} />
          ))}
      </div>
    </>
  );
};
