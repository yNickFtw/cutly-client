import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createUserMutation } from "@/custom-hooks/mutations/user";
import { Loader2 } from "lucide-react";

export const Register = () => {
  const { register, handleSubmit } = useForm();
  
  const mutation = createUserMutation();

  const onSubmit = (data: any) => {
    mutation.mutate(data);
  }

  return (
    <section className="w-full flex items-center justify-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Cadastre-se</CardTitle>
          <CardDescription>Crie sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label>Nome</Label>
              <Input type="text" placeholder="Digite seu nome:" {...register('name')} />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Digite seu email:" {...register('email')} />
            </div>
            <div>
              <Label>Senha</Label>
              <Input type="password" placeholder="Digite sua senha:" {...register('password')} />
            </div>
            <div>
              <Label>Confirmar senha</Label>
              <Input type="password" placeholder="Confirme sua senha:" {...register('confirmPassword')} />
            </div>
            <Button type="submit" disabled={mutation.isPending} className="w-full">
                {mutation.isPending ? <><Loader2 className="animate-spin" /></> : 'Cadastrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
            <Link to="/login" className="text-blue-500 hover:text-blue-600 hover:underline">Já tem uma conta? Entre agora</Link>
        </CardFooter>
      </Card>
    </section>
  );
};
