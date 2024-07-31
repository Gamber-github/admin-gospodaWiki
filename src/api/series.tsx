import { useQuery } from "@tanstack/react-query";
import { seriesListResponseSchema } from "./ResponseSchema/responseSchemas";
import { makeAdminGet, stringifyParams } from "./utils/api";
import { BuildGetArgs, OptionalPageParams } from "./utils/types";

type GetSeries = BuildGetArgs<undefined, OptionalPageParams>;

const getSeries = async ({ queryParams }: GetSeries) =>
  makeAdminGet(
    `Series${stringifyParams(queryParams)}`,
    seriesListResponseSchema
  );

export const useGetSeries = (queryParams: GetSeries["queryParams"] = {}) =>
  useQuery({
    queryKey: ["series", queryParams],
    queryFn: () => getSeries({ queryParams }),
    retry: false,
  });
