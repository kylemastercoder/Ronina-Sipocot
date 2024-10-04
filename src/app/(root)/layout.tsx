import Footer from "@/components/homepage/footer";
import Navbar from "@/components/homepage/navbar";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen overflow-x-hidden">
      {/* Only pass userId if it exists */}
      <Navbar />
      {children}
      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default RootLayout;
