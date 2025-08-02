import { z } from "zod";

export const SignupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
});
export const SigninSchema = z.object({
  username: z.string(),
  password: z.string(),
});
