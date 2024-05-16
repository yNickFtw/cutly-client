import { useTabsContext } from "@/contexts/tabs-context";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export const TabsCompany = () => {
  const { pathname } = useLocation();
  const { slug } = useParams();
  const { activeTab, setActiveTab, getTabs, setTabs } = useTabsContext();

  useEffect(() => {
    setTabs([
      {
        label: `Links`,
        href: `/${slug}/links`,
      },
      {
        label: `Analytics`,
        href: `/${slug}/analytics`,
      },
      {
        label: `Configurações`,
        href: `/${slug}/settings`,
      },
    ]);
  }, [pathname]);

  return (
    <div className="flex flex-row items-center gap-4">
      {getTabs().map((tab, index) => (
        <Link
          to={tab.href}
          key={index}
          className={`text-base font-normal ${
            activeTab === index
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};
