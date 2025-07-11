import React from "react";
import Form from "./Form";

interface Props {
  children: React.ReactElement<React.ComponentProps<typeof Form>>;
}

const FormContainer = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 backdrop-blur-sm border border-white/10">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
