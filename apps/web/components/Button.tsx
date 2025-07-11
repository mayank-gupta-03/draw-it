import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

type Variant = "primary" | "outline" | "ghost";

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
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-medium transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variantStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    outline:
      "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-gray-400",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-300 bg-transparent",
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
      {isLoading && <Spinner size="sm" />}
      {children}
    </button>
  );
};

export default Button;
