import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  authenticateResponseSchema,
  userResponseSchema,
} from "./responseSchemas";
import { makeAdminGet, makeAdminPost } from "./utils/api";

type AuthenticatePayload = {
  userName: string;
  password: string;
};

export const authenticate = (payload: AuthenticatePayload) =>
  makeAdminPost("account/login", authenticateResponseSchema, payload);

export const useAuthenticate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AuthenticatePayload) => authenticate(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [""] });
    },
  });
};

//GET AUTHENTICATED USER

export const getAuthenticatedUser = () =>
  makeAdminGet("account/authorize", userResponseSchema);

export const useGetAuthenticatedUser = (token: string | null) =>
  useQuery({
    queryKey: ["user"],
    queryFn: getAuthenticatedUser,
    enabled: !!token,
    retry: false,
  });
