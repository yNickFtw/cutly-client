import React from "react";

export function TypographyH3({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <h3
      className={`scroll-m-20 text-2xl tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}
