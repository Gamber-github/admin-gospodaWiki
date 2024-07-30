import { useQuery } from "@tanstack/react-query";
import { makeAdminGet, stringifyParams } from "./utils/api";
import { BuildGetArgs, OptionalPageParams } from "./utils/types";
import { RpgSystemsListResponseSchema } from "./utils/ResponseSchema/responseSchemas";

type GetRpgSystems = BuildGetArgs<undefined, OptionalPageParams>;

const getRpgSystems = async ({ queryParams }: GetRpgSystems) =>
  makeAdminGet(
    `RpgSystem${stringifyParams(queryParams)}`,
    RpgSystemsListResponseSchema
  );

export const useGetRpgSystems = (
  queryParams: GetRpgSystems["queryParams"] = {}
) =>
  useQuery({
    queryKey: ["rpgSystems", queryParams],
    queryFn: () => getRpgSystems({ queryParams }),
    retry: false,
  });
