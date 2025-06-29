import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser } from "../apiClient/apiClient";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export const useCreateUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("Logged in successfully.");
      router.push("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        toast.error(message);
      }
    },
  });
};

export const useLoginUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Logged in successfully.");
      router.push("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message;
        toast.error(message);
      }
    },
  });
};
