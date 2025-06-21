import { z } from "zod";

export const LoginUserRequestBody = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(15, "Username cannot exceed 15 characters."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});
