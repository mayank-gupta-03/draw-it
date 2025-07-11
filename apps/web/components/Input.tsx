import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  ref?: React.Ref<HTMLInputElement> | null;
}

const Input = ({
  name,
  error = false,
  errorMessage,
  className,
  label,
  required = false,
  ref,
  ...rest
}: Props) => {
  const baseStyles =
    "w-full border rounded-xl px-4 py-2 text-sm shadow-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const errorStyles = "border-red-500 focus:ring-red-400";

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type="text"
        name={name}
        id={name}
        className={twMerge(baseStyles, error && errorStyles, className)}
        ref={ref}
        aria-invalid={error}
        {...rest}
      />
      <span
        className={twMerge(
          "text-xs min-h-[1rem] mt-1 transition",
          error ? "text-red-500" : "text-transparent"
        )}
      >
        {errorMessage || "Placeholder error"}
      </span>
    </div>
  );
};

export default Input;
