import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useNavigate } from "react-router-dom";
import { createCompanyMutation } from "@/custom-hooks/mutations/company";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const CreateCompanyDialog = ({ children, className }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  const mutation = createCompanyMutation();

  const handleOpen = () => {
    // if () {
    //   toast({
    //     title: "Seu plano chegou ao limite",
    //     description:
    //       "Seu plano chegou ao limite, upgrade para criar mais empresas",
    //     action: <ToastAction altText="Upgrade" onClick={() => navigate("/upgrade")}>Upgrade</ToastAction>,
    //   });

    //   return;
    // }

    setOpen(!open);
  };

  function slugRegexFunction(value: string) {
    if (value.trim() === "") {
      setSlug("");
      return;
    }

    let slugValueFormatted = value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    setSlug(slugValueFormatted);
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);

    if (!e.target.value) {
      setSlug("");
      return;
    }

    slugRegexFunction(e.target.value);
  };

  const handleChangeSlugRegex = (e: React.ChangeEvent<HTMLInputElement>) => {
    slugRegexFunction(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const slugLength = slug.length;

    if (slug[slugLength - 1] === "-") {
      const slugWithoutLastLetter = slug.slice(0, slugLength - 1);

      setSlug(slugWithoutLastLetter);
    }

    mutation.mutate({
      name,
      slug,
      token: localStorage.getItem("token") as string,
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Criar empresa</DialogTitle>
        <DialogDescription>
          Preencha os campos abaixo para criar uma nova empresa.
        </DialogDescription>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <Label>Nome da empresa</Label>
            <Input
              placeholder="Nome da empresa:"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <Label>Slug</Label>
            <Input
              placeholder="Slug: (exemplo: minha-empresa)"
              value={slug}
              onChange={handleChangeSlugRegex}
            />
          </div>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Criar empresa"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
