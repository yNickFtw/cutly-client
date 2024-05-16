import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ICompany } from "@/types/company/ICompany";
import { Link } from "react-router-dom";

interface IProps {
  company: ICompany;
}

export const CardCompany = ({ company }: IProps) => {
  return (
    <Link to={`/${company.slug}`} className="w-[300px]">
      <Card className="w-full max-w-[300px] rounded-md hover:shadow-md hover:cursor-pointer transition-all duration-75">
        <CardHeader className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              {company.logo && <AvatarImage src={company.logo} />}
              <AvatarFallback>{company.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <CardTitle>{company.name}</CardTitle>
          </div>

          <Badge className="rounded-full">Gratuito</Badge>
        </CardHeader>
        <CardContent>
          <p>{company.description}</p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
};
