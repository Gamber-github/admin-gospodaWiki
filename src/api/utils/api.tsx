import qs from "qs";

type Api = "admin";

type Request =
  | { method: "GET"; payload?: unknown; type?: "json" | "form-data" }
  | { method: "POST"; payload: unknown; type: "json" | "form-data" }
  | { method: "PATCH"; payload: unknown; type: "json" | "form-data" };

export const getApiUrl = (api: Api): string => {
  const url = api === "admin" ? import.meta.env.VITE_ADMIN_API_URL : undefined;
  if (typeof url === "string") return url;
  else throw new Error(`No API_URL detected`);
};

const buildDataQuery = async ({
  api,
  request,
  path,
}: {
  api: Api;
  request: Request;
  path: string;
}): Promise<unknown> => {
  const fullUrl = `${getApiUrl(api)}/${path}`;
  const response = await fetch(fullUrl, {
    method: request.method,
    body:
      request.method == "GET"
        ? undefined
        : request.type === "json"
        ? JSON.stringify(request.payload)
        : (request.payload as FormData),
    headers: {
      "Content-Type": "Application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const makeAdminGet = async (path: string): Promise<unknown> => {
  return buildDataQuery({ api: "admin", request: { method: "GET" }, path });
};

export const stringifyParams = (params?: Record<string, unknown> | undefined) =>
  `${Object.keys(params || {}).length ? "?" : ""}${qs.stringify(params || {})}`;
