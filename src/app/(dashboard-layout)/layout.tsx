import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Metadata } from "next";
import React, { ReactNode } from "react";
export const metadata: Metadata = {
  title: "AG | Dashboard",
  description: "Portfolio",
};

const DashboardLayoutPage = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutPage;
