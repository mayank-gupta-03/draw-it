import React from "react";

interface Props {
  children: React.ReactNode;
}

const MaxWidthContainer = ({ children }: Props) => {
  return <div className="bg-slate-900 h-screen w-screen px-32">{children}</div>;
};

export default MaxWidthContainer;
