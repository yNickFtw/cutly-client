import React from "react";
import { TypographyH3 } from "../ui/typographyh3";

interface IProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const HeaderPage = ({ children, className, title }: IProps) => {
  return (
    <div className={`w-full flex items-center justify-between border-b py-14 px-2`}>
      <header
        className={`max-w-[1200px] w-full mx-auto ${className}`}
      >
        {title && (
          <TypographyH3 className="text-xl font-normal">{title}</TypographyH3>
        )}
        {children}
      </header>
    </div>
  );
};
