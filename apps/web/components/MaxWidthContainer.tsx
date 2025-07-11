import React from "react";

interface Props {
  children: React.ReactNode;
}

const MaxWidthContainer = ({ children }: Props) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">{children}</div>
    </div>
  );
};

export default MaxWidthContainer;
