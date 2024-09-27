
import React from "react";

const AdminAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {children}
    </div>
  );
};

export default AdminAuthLayout;
