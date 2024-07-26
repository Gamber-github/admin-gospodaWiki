import { z } from "zod";

export const authenticateResponseSchema = z.object({
  token: z.string(),
});

export const userResponseSchema = z.object({
  userName: z.string(),
  email: z.string(),
});

export type AuthenticateResponse = z.infer<typeof authenticateResponseSchema>;
