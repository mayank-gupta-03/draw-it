import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input = ({
  name,
  value,
  label,
  error,
  errorMessage,
  className,
  ...rest
}: Props) => {
  const baseStyles =
    "border border-gray-300 p-2 rounded-md focus:outline focus:outline focus:outline-slate-900  transition";
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-lg font-semibold">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        className={twMerge(baseStyles, className)}
        {...rest}
      />
      <span className="text-red-500 text-xs">{error && errorMessage}</span>
    </div>
  );
};

export default Input;
