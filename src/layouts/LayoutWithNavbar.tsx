import { HeaderPage } from "@/components/HeaderPage/HeaderPage";
import { Navbar } from "@/components/Navbar/Navbar";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  header: ReactNode;
  title?: string;
  className?: string;
}

export const LayoutWithNavbar = ({
  children,
  header,
  title,
  className,
}: IProps) => {
  return (
    <>
      <Navbar />
      <HeaderPage title={title} className={`mt-[4.7rem] ${className}`}>
        {header}
      </HeaderPage>
      <main className="max-w-[1200px] w-full mx-auto p-4">{children}</main>
    </>
  );
};
