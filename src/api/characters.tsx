import { useQuery } from "@tanstack/react-query";

import { makeAdminGet, stringifyParams } from "./utils/api";
import { BuildGetArgs, OptionalPageParams } from "./utils/types";

type GetCharacters = BuildGetArgs<undefined, OptionalPageParams>;

const getCharacters = async ({ queryParams }: GetCharacters) =>
  makeAdminGet(`character${stringifyParams(queryParams)}`, );

export const useCharacters = (
  queryParams: GetCharacters["queryParams"] = {}
) => {
  return useQuery({
    queryKey: ["characters", queryParams],
    queryFn: () => getCharacters({ queryParams }),
    retry: false,
  });
};
