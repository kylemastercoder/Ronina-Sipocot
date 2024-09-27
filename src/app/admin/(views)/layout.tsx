import Navbar from "@/components/admin/navbar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default AdminLayout;
