import React, { FormHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = ({ children, className, ...rest }: Props) => {
  const baseStyles = "w-full space-y-2";
  return (
    <form className={twMerge(baseStyles, className)} {...rest}>
      {children}
    </form>
  );
};

export default Form;
