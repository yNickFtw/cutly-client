import { create } from "zustand";
import { useCompany } from "../company-context";

type ITabsContext = {
  activeTab: number;
  tabs: {
    label: string;
    href: string;
  }[];
  setTabs: (
    tabs: {
      label: string;
      href: string;
    }[]
  ) => void;
  setActiveTab: (tab: number) => void;
  getActiveTab: () => number;
  getTabs: () => {
    label: string;
    href: string;
  }[];
};

export const useTabsContext = create<ITabsContext>((set, get) => ({
  activeTab: 0,
  tabs: [],
  setTabs: (
    tabs: {
      label: string;
      href: string;
    }[]
  ) => set({ tabs: tabs }),
  setActiveTab: (tab: number) => set({ activeTab: tab }),
  getActiveTab: () => get().activeTab,
  getTabs: () => get().tabs,
}));
