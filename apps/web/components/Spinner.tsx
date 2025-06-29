import { twMerge } from "tailwind-merge";

type SpinnerSize = "sm" | "md" | "lg";

interface Props {
  size?: SpinnerSize;
}

export default function Spinner({ size = "md" }: Props) {
  const baseStyles =
    "animate-spin rounded-full border-3 border-solid border-r-transparent";
  const sizeStyles: Record<SpinnerSize, string> = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };
  return <div className={twMerge(baseStyles, sizeStyles[size])} />;
}
