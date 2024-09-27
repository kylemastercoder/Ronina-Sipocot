import React from "react";

const Container = ({ children, className }: { children: React.ReactNode; className?: string; }) => {
  return <div className={`max-w-[1580px] mx-auto w-full ${className}`}>{children}</div>;
};

export default Container;
