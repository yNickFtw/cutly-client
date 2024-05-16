import { CreateCompanyDialog } from "@/components/CreateCompanyDialog/CreateCompanyDialog";
import { Button } from "@/components/ui/button";
import emptyCompanyDark from '@/assets/emptydarktheme.svg';
import emptyCompanyWhite from '@/assets/emptywhitetheme.svg';
import { TypographyH3 } from "@/components/ui/typographyh3";

export const EmptyCompanies = () => {
  return (
    <div className="flex flex-col mt-10 items-center justify-center gap-5 border-2 p-12 rounded-lg">
      <TypographyH3 className="text-2xl font-extrabold">Nenhuma empresa cadastrada</TypographyH3>
      <p className="text-lg">
        Cadastre sua primeira empresa para começar
      </p>
      <img src={emptyCompanyDark} className="w-[200px]" />
      <CreateCompanyDialog>
        <Button variant={"default"}>Criar Empresa</Button>
      </CreateCompanyDialog>
    </div>
  );
};
