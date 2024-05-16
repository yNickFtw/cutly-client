import { HeaderPage } from "@/components/HeaderPage/HeaderPage";
import { TabsCompany } from "@/components/TabsCompany/TabsCompany";
import { useCompany } from "@/contexts/company-context";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CompanyBySlug = () => {
  const { slug } = useParams();

  const navigate = useNavigate();
  const { getCompanyBySlug, setCompanySelected } = useCompany();

  useEffect(() => {
    if (!slug) {
      navigate("/");
    }
    
    setCompanySelected(getCompanyBySlug(slug!));
  }, [slug]);

  return (
    <>
    </>
  );
};
