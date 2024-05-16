import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { loginMutation } from "@/custom-hooks/mutations/auth";
import { Loader2 } from "lucide-react";

export const Login = () => {
  const { register, handleSubmit } = useForm();

  const instanceLoginMutation = loginMutation();

  const onSubmit = (data: any) => {
    if(!data.email || !data.password) {
      toast({
        title: "Parece que você esqueceu de preencher algum campo",
        variant: "destructive",
      });

      return;
    }

    instanceLoginMutation.mutate(data);
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Entre na sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Digite seu email:"
                {...register("email")}
              />
            </div>
            <div>
              <Label>Senha</Label>
              <Input
                type="password"
                placeholder="Digite sua senha:"
                {...register("password")}
              />
            </div>
            <Button type="submit" className="w-full" disabled={instanceLoginMutation.isPending}>
              {instanceLoginMutation.isPending ? <><Loader2 className="animate-spin" /></> : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
            <Link to="/register" className="text-blue-500 hover:text-blue-600 hover:underline">Não tem uma conta? Cadastre-se</Link>
        </CardFooter>
      </Card>
    </section>
  );
};
