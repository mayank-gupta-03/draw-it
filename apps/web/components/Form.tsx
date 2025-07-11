import React, { FormHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = ({ children, className, ...rest }: Props) => {
  const baseStyles =
    "w-full max-w-xl mx-auto space-y-4 bg-white p-6 rounded-2xl shadow-md";

  return (
    <form className={twMerge(baseStyles, className)} {...rest}>
      {children}
    </form>
  );
};

export default Form;
