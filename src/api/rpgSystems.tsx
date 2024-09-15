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
  emptySchema,
  rpgSystemDetailsResponseSchema,
  RpgSystemsListResponseSchema,
} from "./ResponseSchema/responseSchemas";
import { EmptyObject } from "react-hook-form";

export type RpgSystemIdParam = {
  rpgSystemId: string;
};

//GET RPGSYSTEMS
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

//DELETE RPGSYSTEM

type DeleteRpgSystem = BuildUpdateArgs<EmptyObject, RpgSystemIdParam>;

const deleteRpgSystem = async ({ rpgSystemId, payload }: DeleteRpgSystem) =>
  makeAdminDelete(`RpgSystem/${rpgSystemId}`, emptySchema, payload);

export const useDeleteRpgSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rpgSystemId }: RpgSystemIdParam) =>
      deleteRpgSystem({ rpgSystemId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rpgSystems"] });
    },
  });
};

//CREATE RPGSYSTEM

export type NewRpgSystemPayload = {
  name: string;
  description: string;
};

const addRpgSystem = async (payload: NewRpgSystemPayload) =>
  makeAdminPost("RpgSystem", emptySchema, payload);

export const useAddRpgSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewRpgSystemPayload) => addRpgSystem(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rpgSystems"] });
    },
  });
};

//GET RPGSYSTEM

type GetRpgSystem = BuildGetArgs<{ rpgSystemId: string }>;

const getRpgSystem = ({ rpgSystemId }: GetRpgSystem) =>
  makeAdminGet(`RpgSystem/${rpgSystemId}`, rpgSystemDetailsResponseSchema);

export const useGetRpgSystem = (rpgSystemId: string) =>
  useQuery({
    queryKey: ["rpgSystem", rpgSystemId],
    queryFn: () => getRpgSystem({ rpgSystemId }),
  });

//PUBLISH RPGSYSTEM

type PublishRpgSystem = BuildUpdateArgs<EmptyObject, RpgSystemIdParam>;

export const publishRpgSystem = ({ rpgSystemId, payload }: PublishRpgSystem) =>
  makeAdminPatch(`RpgSystem/${rpgSystemId}/publish`, emptySchema, payload);

export const usePublishRpgSystem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rpgSystemId }: RpgSystemIdParam) =>
      publishRpgSystem({ rpgSystemId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["rpgSystem"],
        exact: false,
      });
    },
  });
};

//EDIT RPGSYSTEM

export type EditRpgSystemPayload = {
  name: string;
  description: string;
  tagsIds: number[];
  charactersIds: number[];
  seriesIds: number[];
};

const editRpgSystem = (rpgSystemId: string, payload: EditRpgSystemPayload) =>
  makeAdminPut(`RpgSystem/${rpgSystemId}`, emptySchema, payload);

export const useEditRpgSystem = (rpgSystemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditRpgSystemPayload) =>
      editRpgSystem(rpgSystemId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rpgSystem", rpgSystemId] });
    },
  });
};
