export type UserType = "Unknown" | "Anonymous" | "Authenticated";

export type AuthUser = {
  userName: string;
  email: string;
  type: UserType;
};
