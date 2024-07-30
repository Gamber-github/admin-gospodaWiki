import { useQuery } from "@tanstack/react-query";
import { makeAdminGet, stringifyParams } from "./utils/api";
import { TagsReferenceListResponseSchema } from "./utils/ResponseSchema/responseSchemas";
import { BuildGetArgs, OptionalPageParams } from "./utils/types";

//GET TAGS
type GetTags = BuildGetArgs<undefined, OptionalPageParams>;

const getTags = async ({ queryParams }: GetTags) =>
  makeAdminGet(
    `tag${stringifyParams(queryParams)}`,
    TagsReferenceListResponseSchema
  );

export const useGetTags = (queryParams: GetTags["queryParams"] = {}) =>
  useQuery({
    queryKey: ["tags"],
    queryFn: () => getTags({ queryParams }),
  });
