import { useQuery } from "@tanstack/react-query";
import { makeAdminGet, stringifyParams } from "./utils/api";
import { ItemsReferenceListResponseSchema } from "./utils/ResponseSchema/responseSchemas";
import { BuildGetArgs, OptionalPageParams } from "./utils/types";

//GET ITEMS
type GetItems = BuildGetArgs<undefined, OptionalPageParams>;

const getItems = async ({ queryParams }: GetItems) =>
  makeAdminGet(
    `Item${stringifyParams(queryParams)}`,
    ItemsReferenceListResponseSchema
  );

export const useGetItems = (queryParams: GetItems["queryParams"] = {}) =>
  useQuery({
    queryKey: ["items"],
    queryFn: () => getItems({ queryParams }),
  });
