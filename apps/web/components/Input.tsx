import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
}

const Input = ({
  name,
  error = false,
  errorMessage,
  className,
  label,
  required = false,
  ...rest
}: Props) => {
  const baseStyles =
    "w-full border border-slate-900/40 rounded-md p-2 outline-none focus:ring focus:ring-slate-900 transition";
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col">
        <label htmlFor={name} className="text-md">
          {label}
          {required && <span className="text-md text-red-500  ml-1">*</span>}
        </label>
        <input
          type="text"
          name={name}
          className={twMerge(baseStyles, className)}
          id={name}
          {...rest}
        />
      </div>
      <span
        className={twMerge(
          "text-xs text-red-500 min-h-[1rem]",
          error ? "visible" : "invisible"
        )}
      >
        {errorMessage}
      </span>
    </div>
  );
};

export default Input;
