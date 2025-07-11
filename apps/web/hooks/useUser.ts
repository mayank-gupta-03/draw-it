import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser } from "../apiClient/apiClient";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
