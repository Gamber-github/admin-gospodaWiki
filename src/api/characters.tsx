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
  BuildGetArgs,
  BuildUpdateArgs,
  OptionalPageParams,
} from "./utils/types";
import {
  characterDetailsResponseSchema,
  charactersResponseSchema,
  emptySchema,
} from "./ResponseSchema/responseSchemas";
import { EmptyObject } from "react-hook-form";

export type characterIdParam = {
  characterId: string;
};

//GET CHARACTERS
type GetCharacters = BuildGetArgs<object, OptionalPageParams>;

const getCharacters = (queryParams: GetCharacters["queryParams"]) =>
  makeAdminGet(
    `character${stringifyParams(queryParams)}`,
    charactersResponseSchema
  );

export const useGetCharacters = (
  queryParams: GetCharacters["queryParams"] = {}
) =>
  useQuery({
    queryKey: ["characters", queryParams],
    queryFn: () => getCharacters(queryParams),
    retry: false,
  });

//DELETE CHARACTER

type DeleteCharacterArgs = BuildUpdateArgs<EmptyObject, characterIdParam>;

const deleteCharacter = async ({ characterId, payload }: DeleteCharacterArgs) =>
  makeAdminDelete(`character/${characterId}`, emptySchema, payload);

export const useDeleteCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ characterId }: characterIdParam) =>
      deleteCharacter({ characterId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};

//GET CHARACTER

type GetCharacterArgs = BuildGetArgs<{ characterId: string }>;

const getCharacter = ({ characterId }: GetCharacterArgs) =>
  makeAdminGet(`character/${characterId}`, characterDetailsResponseSchema);

export const useGetCharacter = (characterId: string) => {
  return useQuery({
    queryKey: ["character", characterId],
    queryFn: () => getCharacter({ characterId }),
  });
};

//PUBLISH CHARACTER

type PublishCharacterArgs = BuildUpdateArgs<EmptyObject, characterIdParam>;

const publishCharacter = async ({
  characterId,
  payload,
}: PublishCharacterArgs) =>
  makeAdminPatch(`character/${characterId}/publish`, emptySchema, payload);

export const usePublishCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ characterId }: characterIdParam) =>
      publishCharacter({ characterId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["character"],
      });
      queryClient.invalidateQueries({
        queryKey: ["characters"],
        exact: false,
      });
    },
  });
};

//EDIT CHARACTER

export type EditCharacterPayload = {
  firstName: string;
  lastName: string;
  age: number;
  description: string;
  seriesId: number;
  rpgSystemId: number;
  tagsId: number[];
  itemsId: number[];
};

const editCharacter = async (
  characterId: string,
  payload: EditCharacterPayload
) => makeAdminPut(`character/${characterId}`, emptySchema, payload);

export const useEditCharacter = (characterId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditCharacterPayload) =>
      editCharacter(characterId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["character", characterId],
      });
    },
  });
};

//CREATE CHARACTER

export type NewCharacterPayload = {
  firstName: string;
  lastName: string;
  age: number;
  description: string;
  seriesId: number;
  rpgSystemId: number;
};

const addCharacter = async (payload: NewCharacterPayload) =>
  makeAdminPost("character", emptySchema, payload);

export const useAddCharacter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewCharacterPayload) => addCharacter(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
    },
  });
};
