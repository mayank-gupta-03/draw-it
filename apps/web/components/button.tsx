import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./spinner";

type Variant = "primary" | "outline";

interface Button extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  children: React.ReactNode;
}

const Button = ({
  variant,
  children,
  className,
  disabled,
  ...rest
}: Button) => {
  const baseStyles: string =
    "w-full cursor-pointer px-4 py-2 transition-all rounded font-medium".trim();
  const disabledStyles: string =
    "cursor-not-allowed opacity-50 pointer-events-none flex items-center justify-center";
  const variantStyles: Record<Variant, string> = {
    primary:
      "bg-slate-900 text-white border border-2 border-slate-900 hover:border-slate-800 hover:bg-slate-800".trim(),
    outline:
      "bg-white text-slate-900 border border-2 border-slate-900 hover:bg-slate-100".trim(),
  };
  return (
    <button
      className={twMerge(
        baseStyles,
        disabled && disabledStyles,
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {disabled ? <Spinner /> : children}
    </button>
  );
};

export default Button;
