import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type Variant = "primary" | "outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = ({
  variant,
  children,
  className,
  disabled,
  isLoading = false,
  ...rest
}: Props) => {
  const baseStyles =
    "w-full px-4 py-2 rounded-lg cursor-pointer transition-all flex justify-center items-center gap-2";
  const variantStyles = {
    primary: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border-2 border-slate-900 text-black hover:bg-slate-100",
  };
  const disabledStyles = "opacity-50 cursor-not-allowed pointer-events-none";
  const isButtonDisabled = disabled || isLoading;

  return (
    <button
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        isButtonDisabled && disabledStyles,
        className
      )}
      disabled={isButtonDisabled}
      {...rest}
    >
      {children}
      {isLoading && <Spinner size="sm" />}
    </button>
  );
};

export default Button;
