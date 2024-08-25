import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  makeAdminDelete,
  makeAdminGet,
  makeAdminPatch,
  makeAdminPost,
  makeAdminPut,
  stringifyParams,
} from "./utils/api";
import {
  emptySchema,
  TagsListResponseSchema,
} from "./ResponseSchema/responseSchemas";
import {
  BuildGetArgs,
  BuildUpdateArgs,
  OptionalPageParams,
} from "./utils/types";
import { EmptyObject } from "react-hook-form";
import message from "antd/es/message";

export type TagIdParam = {
  tagId: string;
};

//GET TAGS
type GetTags = BuildGetArgs<undefined, OptionalPageParams>;

const getTags = async ({ queryParams }: GetTags) =>
  makeAdminGet(`tag${stringifyParams(queryParams)}`, TagsListResponseSchema);

export const useGetTags = (queryParams: GetTags["queryParams"] = {}) =>
  useQuery({
    queryKey: ["tags", queryParams],
    queryFn: () => getTags({ queryParams }),
  });

//DELETE TAG

type DeleteTag = BuildUpdateArgs<EmptyObject, TagIdParam>;

const deleteTag = ({ tagId, payload }: DeleteTag) =>
  makeAdminDelete(`tag/${tagId}`, emptySchema, payload);

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tagId }: TagIdParam) => deleteTag({ tagId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
      message.success("Rekord pomyślnie usunięty");
    },
  });
};

//CREATE TAG

type CreateTagPayload = {
  name: string;
};

const addTag = (payload: CreateTagPayload) =>
  makeAdminPost("tag", emptySchema, payload);

export const useAddTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTagPayload) => addTag(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      message.success("Rekord pomyślnie dodany");
    },
  });
};

//PUBLISH TAG

type PublishTag = BuildUpdateArgs<EmptyObject, TagIdParam>;

const publishTag = ({ tagId, payload }: PublishTag) =>
  makeAdminPatch(`tag/${tagId}/publish`, emptySchema, payload);

export const usePublishTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tagId }: TagIdParam) => publishTag({ tagId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
      message.success("Rekord pomyślnie opublikowany");
    },
  });
};

//EDIT TAG

export type EditTagPayload = {
  name: string;
};

const editTag = (tagId: string, payload: EditTagPayload) =>
  makeAdminPut(`tag/${tagId}`, emptySchema, payload);

export const useEditTag = (tagId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditTagPayload) => editTag(tagId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
      message.success("Rekord pomyślnie edytowany");
    },
  });
};
