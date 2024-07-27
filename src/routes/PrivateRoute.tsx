import { useAuthUser } from "../store/AuthUserProvider";
import { UserType } from "../utils/domain";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { getUrl, RouteName } from "./router";
import { Navigate } from "react-router-dom";

const layouts = {
  default: DefaultLayout,
} as const;

type Layout = keyof typeof layouts;

export type PrivatePagesProps = {
  element: () => JSX.Element;
  fallback?: RouteName;
  access?: UserType[];
  layout?: Layout;
};

export const Private: React.FC<PrivatePagesProps> = ({
  element,
  fallback,
  access = ["Authenticated"],
  layout = "default",
}) => {
  const { user } = useAuthUser();
  const Component = element;
  const Layout = layouts[layout];

  const { type } = user;

  if (type === "Unknown") {
    return null;
  }

  if (!access.includes(type)) {
    const path = window.location.pathname.slice(1);
    const fallbackParam = `?fallback=${path}`;

    return (
      <Navigate
        to={(fallback ? getUrl(fallback) : getUrl("login")) + fallbackParam}
        replace
      />
    );
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
};
