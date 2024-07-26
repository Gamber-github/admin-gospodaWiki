import React from "react";
import { getUrl, Route } from "./router";
import { Navigate, useSearchParams } from "react-router-dom";
import { useAuthUser } from "../store/AuthUserProvider";

export const Public: React.FC<{
  element: () => JSX.Element;
  fallback?: Route;
}> = ({ element, fallback }) => {
  const { user } = useAuthUser();
  const [params] = useSearchParams();

  const Component = element;

  const { type } = user;

  if (type == "Unknown") {
    return null;
  }

  const fallbbackUrl = params.get("fallback");

  const url = fallbbackUrl
    ? getUrl("main") + (fallbbackUrl || "")
    : getUrl("login");

  if (type !== "Anonymous") {
    return <Navigate to={fallback ?? url} replace />;
  }

  return <Component />;
};
