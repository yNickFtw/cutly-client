import { CreateCompanyDialog } from "@/components/CreateCompanyDialog/CreateCompanyDialog";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";

export const HeaderHome = () => {
  return (
    <CreateCompanyDialog>
      <Button variant="default" className="flex items-center gap-2">
        Criar empresa <CirclePlusIcon size={16} />
      </Button>
    </CreateCompanyDialog>
  );
};
