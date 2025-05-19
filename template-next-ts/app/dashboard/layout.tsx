import React from "react";
import { AuthProvider } from "@/contexts/auth/auth-provider";
import AppLayout from "@/components/layout/app-layout";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AppLayout>{children}</AppLayout>
    </AuthProvider>
  );
};

export default DashboardLayout;
