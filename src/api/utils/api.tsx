import qs from "qs";
import { z } from "zod";
import { TokenManager } from "../../store/TokenManager";

type Api = "admin";

type Request =
  | { method: "GET"; payload?: unknown; type?: "json" | "form-data" }
  | { method: "POST"; payload: unknown; type: "json" | "form-data" }
  | { method: "PUT"; payload: unknown; type: "json" | "form-data" }
  | { method: "PATCH"; payload?: unknown; type: "json" | "form-data" }
  | { method: "DELETE"; payload?: unknown; type: "json" | "form-data" };

export const getApiUrl = (api: Api): string => {
  const url = api === "admin" ? import.meta.env.VITE_ADMIN_API_URL : undefined;
  if (typeof url === "string") return url;
  else throw new Error(`No API_URL detected`);
};

const extractResponse = async (response: Response) => {
  try {
    return await response.json();
  } catch (error) {
    return {};
  }
};

const buildDataQuery = async <T extends z.ZodTypeAny>({
  api,
  request,
  path,
  schema,
}: {
  api: Api;
  request: Request;
  path: string;
  schema: T;
}): Promise<z.TypeOf<T>> => {
  const fullUrl = `${getApiUrl(api)}/${path}`;
  const response = await fetch(fullUrl, {
    method: request.method,
    body:
      request.method == "GET"
        ? undefined
        : request.type === "json"
        ? JSON.stringify(request.payload)
        : (request.payload as FormData),
    headers:
      (request.method === "POST" || request.method === "PUT") &&
      request.type === "form-data"
        ? TokenManager.getAuthHeader()
        : {
            "Content-Type": "Application/json",
            ...TokenManager.getAuthHeader(),
          },
  });

  const data = await extractResponse(response);

  if (response.status >= 400) {
    throw new Error(data.message);
  }
  const result = schema.safeParse(data);

  if (!result.success) throw new Error(result.error.message);

  return result.data;
};

export const makeAdminGet = <T extends z.ZodTypeAny>(
  path: string,
  schema: T
) => {
  return buildDataQuery({
    api: "admin",
    request: { method: "GET" },
    path,
    schema,
  });
};

export const makeAdminPost = <T extends z.ZodTypeAny>(
  path: string,
  schema: T,
  payload: unknown
) =>
  buildDataQuery({
    api: "admin",
    request: { method: "POST", type: "json", payload },
    path,
    schema,
  });

export const makeAdminPatch = <T extends z.ZodTypeAny>(
  path: string,
  schema: T,
  payload: unknown
) => {
  return buildDataQuery({
    api: "admin",
    request: { method: "PATCH", type: "json", payload },
    path,
    schema,
  });
};

export const makeAdminPut = <T extends z.ZodTypeAny>(
  path: string,
  schema: T,
  payload: unknown
) => {
  return buildDataQuery({
    api: "admin",
    request: { method: "PUT", type: "json", payload },
    path,
    schema,
  });
};

export const makeAdminDelete = <T extends z.ZodTypeAny>(
  path: string,
  schema: T,
  payload: unknown
) => {
  return buildDataQuery({
    api: "admin",
    request: { method: "DELETE", payload, type: "json" },
    path,
    schema,
  });
};

export const stringifyParams = (params?: Record<string, unknown> | undefined) =>
  `${Object.keys(params || {}).length ? "?" : ""}${qs.stringify(params || {})}`;
