import { twMerge } from "tailwind-merge";

interface Props {
  size?: "sm" | "md" | "lg";
}

const Spinner = ({ size = "md" }: Props) => {
  const sizeStyleMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };
  const baseStyles =
    "border-2 border-t-2 border-gray-300 border-t-slate-900 rounded-full animate-spin";
  return <div className={twMerge(baseStyles, sizeStyleMap[size])} />;
};

export default Spinner;
