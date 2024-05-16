import defaultProfileImage from "@/assets/defaultprofile.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Link } from "react-router-dom";
import { IUser } from "@/types/user/IUser";
import { PersonIcon } from "@radix-ui/react-icons";
import { LogOut } from "lucide-react";

interface IProps {
  user: IUser | null;
  logout: () => void;
}

export const DropdownUser = ({ user, logout }: IProps) => {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={defaultProfileImage} alt="Foto de perfil" />
            <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44 mr-3 p-2">
          <p className="text-sm font-semibold">{user?.name}</p>
          <p className="text-sm text-muted-foreground">{user?.email}</p>

          <DropdownMenuSeparator />
          <Link to="/profile">
            <DropdownMenuItem><PersonIcon className="w-4 h-4 mr-2 font-normal" /> Perfil</DropdownMenuItem>
          </Link>
          <AlertDialogTrigger asChild className="w-full">
            <DropdownMenuItem><LogOut className="w-4 h-4 mr-2 font-normal" /> Sair</DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogTitle>Você tem certeza que deseja sair?</AlertDialogTitle>
        <AlertDialogDescription>
          Ao sair, você será desconectado da sua conta e perderá acesso a todas
          as funcionalidades do Cutly.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button onClick={logout}>Confirmar</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
