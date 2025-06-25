import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

const Spinner = ({ className }: Props) => {
  const baseStyles =
    "w-6 h-6 border-2 border-t-2 border-gray-300 border-t-slate-900 rounded-full animate-spin";
  return <div className={twMerge(baseStyles, className)} />;
};

export default Spinner;
