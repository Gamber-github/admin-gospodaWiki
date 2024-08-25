//GET LOCATIONS

import { useQuery } from "@tanstack/react-query";
import { BuildGetArgs, OptionalPageParams } from "./utils/types";
import { makeAdminGet, stringifyParams } from "./utils/api";
import { locationsListResponseSchema } from "./ResponseSchema/responseSchemas";

type GetLocations = BuildGetArgs<undefined, OptionalPageParams>;

const getLocations = async ({ queryParams }: GetLocations) =>
  makeAdminGet(
    `Location${stringifyParams(queryParams)}`,
    locationsListResponseSchema
  );

export const useGetLocations = (
  queryParams: GetLocations["queryParams"] = {}
) =>
  useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocations({ queryParams }),
    retry: false,
  });
