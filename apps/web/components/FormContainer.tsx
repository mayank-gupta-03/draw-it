import React from "react";
import Form from "./Form";

interface Props {
  children: React.ReactElement<React.ComponentProps<typeof Form>>;
}

const FormContainer = ({ children }: Props) => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-80 bg-white/80 p-8 rounded-xl shadow-2xl">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
