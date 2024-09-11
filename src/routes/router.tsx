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
import { Players } from "../pages/Player/Players";
import { PlayerEdit } from "../pages/Player/PlayerEdit";
import { Characters } from "../pages/Character/Characters";
import { CharacterEdit } from "../pages/Character/CharacterEdit";
import { RpgSystems } from "../pages/RpgSystems/RpgSystems";
import { RpgSystemEdit } from "../pages/RpgSystems/RpgSystemEdit";
import { Series } from "../pages/Series/Series";
import { SeriesEdit } from "../pages/Series/SeriesEdit";
import { Items } from "../pages/Item/Items";
import { ItemEdit } from "../pages/Item/ItemEdit";
import { Tags } from "../pages/Tags/Tags";
import { Events } from "../pages/Event/Events";
import { EventEdit } from "../pages/Event/EventEdit";
import { Locations } from "../pages/Location/Locations";
import { LocationEdit } from "../pages/Location/LocationEdit";

export const APP_ROUTES = {
  main: "/",
  dashboard: "/dashboard",
  login: "/login",
  characters: "/characters",
  editCharacter: "/characters/:id/edit",
  events: "/events",
  editEvent: "/events/:id/edit",
  locations: "/locations",
  editLocation: "/locations/:id/edit",
  items: "/items",
  editItem: "/items/:id/edit",
  players: "/players",
  editPlayer: "/players/:playerId/edit",
  rpgSystems: "/rpg-systems",
  editRpgSystem: "/rpg-system/:id/edit",
  series: "/series",
  editSerie: "/series/:id/edit",
  stories: "/stories",
  editStory: "/stories/edit",
  addStory: "/stories/add",
  tags: "/tags",
  editTag: "/tags/:id/edit",
  adventures: "/adventure",
  editAdventure: "/adventure/:id/edit",
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

export const getUrl = <T extends RouteName>(
  url: T,
  ...[params]: GetPeyload<T>
) => generatePath<string>(APP_ROUTES[url], params);

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
    path: "/players",
    element: <Private element={Players} />,
  },
  {
    path: "/players/:playerId/edit",
    element: <Private element={PlayerEdit} />,
  },
  {
    path: "/characters",
    element: <Private element={Characters} />,
  },
  {
    path: "/characters/:id/edit",
    element: <Private element={CharacterEdit} />,
  },
  {
    path: "/rpg-systems",
    element: <Private element={RpgSystems} />,
  },
  {
    path: "/rpg-system/:id/edit",
    element: <Private element={RpgSystemEdit} />,
  },
  {
    path: "/series",
    element: <Private element={Series} />,
  },
  {
    path: "/series/:id/edit",
    element: <Private element={SeriesEdit} />,
  },
  {
    path: "/items",
    element: <Private element={Items} />,
  },
  {
    path: "/items/:id/edit",
    element: <Private element={ItemEdit} />,
  },
  {
    path: "/tags",
    element: <Private element={Tags} />,
  },
  {
    path: "/events",
    element: <Private element={Events} />,
  },
  {
    path: "/events/:id/edit",
    element: <Private element={EventEdit} />,
  },
  {
    path: "/locations",
    element: <Private element={Locations} />,
  },
  {
    path: "/locations/:id/edit",
    element: <Private element={LocationEdit} />,
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
