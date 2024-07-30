import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  QueryClient,
  UseMutateAsyncFunction,
  useQueryClient,
} from "@tanstack/react-query";
import { AuthUser } from "../utils/domain";
import { AuthenticateResponse } from "../api/utils/ResponseSchema/responseSchemas";
import { usePersistedState } from "../hooks/usePersistedState";
import { useAuthenticate, useGetAuthenticatedUser } from "../api/authenticate";
import { TokenManager } from "./TokenManager";

const initialState: AuthUser = {
  userName: "",
  email: "",
  type: "Unknown",
};

type ActionMetaPayload = {
  authenticateMutation: UseMutateAsyncFunction<
    AuthenticateResponse,
    unknown,
    LoginPayload,
    unknown
  >;
  setUser: Dispatch<SetStateAction<AuthUser>>;
};

type LoginPayload = {
  userName: string;
  password: string;
};

const login =
  (
    meta: ActionMetaPayload,
    setToken: Dispatch<SetStateAction<string | null>>
  ) =>
  async (payload: LoginPayload) => {
    const response = await meta.authenticateMutation(payload);
    const { token } = response;

    setToken(token);
  };

const logout =
  (
    _meta: ActionMetaPayload,
    setToken: Dispatch<SetStateAction<string | null>>,
    queryClient: QueryClient
  ) =>
  async () => {
    setToken(null);
    await queryClient.invalidateQueries();
    queryClient.clear();
  };

type LoginFn = ReturnType<typeof login>;
type LogoutFn = ReturnType<typeof logout>;

type UserContextPayload = {
  user: AuthUser;
  isAuthenticateLoading: boolean;
  authenticateError: Error;
} & {
  login: LoginFn;
  logout: LogoutFn;
};

const UserContext = createContext<UserContextPayload>({} as UserContextPayload);

export const AuthUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser>(initialState);
  const [token, setToken] = usePersistedState<string | null>(
    "token",
    null,
    TokenManager.setToken
  );

  const queryClient = useQueryClient();

  const {
    mutateAsync: authenticateMutation,
    isLoading: isAuthenticateLoading,
    error: authenticateError,
  } = useAuthenticate();

  const {
    data,
    isError: isAuthenticatedError,
    remove,
  } = useGetAuthenticatedUser(token);

  useEffect(() => {
    if (!token) {
      setUser({ ...initialState, type: "Anonymous" });
      TokenManager.setToken(null);
      remove();
    }
  }, [token]);

  useEffect(() => {
    if (data) return setUser({ ...data, type: "Authenticated" });
  }, [data]);

  useEffect(() => {
    if (isAuthenticatedError) {
      setToken(null);
    }
  }, [isAuthenticatedError]);

  const mutation = {
    authenticateMutation,
    setUser,
  };

  const actions = {
    login: login(mutation, setToken),
    logout: logout(mutation, setToken, queryClient),
  };

  const value = {
    user,
    isAuthenticateLoading,
    authenticateError: authenticateError as Error,
    ...actions,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuthUser = () => useContext(UserContext);
