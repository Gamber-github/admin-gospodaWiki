import {
  createBrowserRouter,
  generatePath,
  Navigate,
  NavigateOptions,
  RouteObject,
  useNavigate,
} from "react-router-dom";
import { Public } from "./PublicRoute";
import { Login } from "../pages/Login";
import { stringifyParams } from "../api/utils/api";
import Error404 from "../pages/Error404";
import Dashboard from "../pages/Dashboard";
import { Private } from "./PrivateRoute";

export const APP_ROUTES = {
  main: "/",
  dashboard: "/dashboard",
  login: "/login",
  characters: "/characters",
  character: "/characters/:id",
  editCharacter: "/characters/:id/edit",
  events: "/events",
  event: "/events/:id",
  editEvent: "/events/:id/edit",
  locations: "/locations",
  location: "/locations/:id",
  editLocation: "/locations/:id/edit",
  items: "/items",
  item: "/items/:id",
  editItem: "/items/:id/edit",
  players: "/players",
  player: "/players/:id",
  editPlayer: "/players/:id/edit",
  rpgSystems: "/rpg-systems",
  rpgSystem: "/rpg-systems/:id",
  editRpgSystem: "/rpg-systems/:id/edit",
  series: "/series",
  serie: "/series/:id",
  editSerie: "/series/:id/edit",
  stories: "/stories",
  story: "/stories/:id",
  editStory: "/stories/edit",
  addStory: "/stories/add",
  tag: "/tags/:id",
  editTag: "/tags/:id/edit",
  rest: "*",
} as const;

type RoutesMap = typeof APP_ROUTES;

export type RouteName = keyof RoutesMap;

export type Route = RoutesMap[RouteName];

export type GetParams<T> = string extends T
  ? object
  : T extends `${string}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof GetParams<Rest>]: string }
  : T extends `${string}:${infer Param}`
  ? { [k in Param]: string }
  : object;

type HasKeys<T> = keyof T extends never ? false : true;

type ExtractParams<T> = HasKeys<GetParams<T>> extends true
  ? GetParams<T>
  : undefined;

export type GetPeyload<T extends RouteName> = ExtractParams<
  RoutesMap[T]
> extends undefined
  ? [undefined?]
  : [Record<keyof ExtractParams<RoutesMap[T]>, string>];

export const getUrl = <T extends RouteName>(url: T, ...params: GetPeyload<T>) =>
  generatePath<string>(APP_ROUTES[url], params);

export const routes: (RouteObject & { path: Route })[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Public element={Login} />,
  },
  {
    path: "/dashboard",
    element: <Private element={Dashboard} />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter(routes);

export const useNav = () => {
  const _navigate = useNavigate();

  const navigate = <T extends RouteName>(url: T, ...params: GetPeyload<T>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fullUrl = getUrl(url, ...(params as any));

    return _navigate(fullUrl);
  };

  const navigateWithOptions = <T extends RouteName>(
    url: T,
    options: NavigateOptions & { queryParams?: Record<string, string> },
    ...[params]: GetPeyload<T>
  ) => {
    const { queryParams } = options;

    const queryString = Object.keys(queryParams || {}).length
      ? stringifyParams(queryParams)
      : "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fullUrl = getUrl(url, ...(params as any)) + queryString;

    return _navigate(fullUrl, options);
  };

  return {
    navigate,
    navigateWithOptions,
  };
};

export type NavigateFn = <T extends RouteName>(
  url: T,
  ...params: GetPeyload<T>
) => void;

export type NavigateWithOptionsFn = <T extends RouteName>(
  url: T,
  options: NavigateOptions & { queryParams?: Record<string, string> },
  ...params: GetPeyload<T>
) => void;
