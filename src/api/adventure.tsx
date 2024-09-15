//GET ADVENRTURES

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adventureDetailsResponseSchema,
  adventuresListResponseSchema,
  emptySchema,
} from "./ResponseSchema/responseSchemas";
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
import { EmptyObject } from "react-hook-form";
import { message } from "antd";

export type AdventureIdParam = {
  adventureId: string;
};

type GetAdventueres = BuildGetArgs<undefined, OptionalPageParams>;

const getAdventures = async (queryParams: GetAdventueres["queryParams"]) =>
  makeAdminGet(
    `Adventure${stringifyParams(queryParams)}`,
    adventuresListResponseSchema
  );

export const useGetAdventures = (
  queryParams: GetAdventueres["queryParams"] = {}
) =>
  useQuery({
    queryKey: ["adventures", queryParams],
    queryFn: () => getAdventures(queryParams),
    retry: false,
  });

//DELETE ADVENTURE

type DeleteAdventure = BuildUpdateArgs<EmptyObject, AdventureIdParam>;

const deleteAdventure = ({ adventureId, payload }: DeleteAdventure) =>
  makeAdminDelete(`Adventure/${adventureId}`, emptySchema, payload);

export const useDeleteAdventure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adventureId }: AdventureIdParam) =>
      deleteAdventure({ adventureId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adventures"] });
      message.success("Rekord pomyślnie usunięty");
    },
  });
};

//CREATE ADVENTURE

export type CreateAdventurePayload = {
  title: string;
  description?: string;
  rpgSystemId?: number;
  seriesId?: number;
};

const addAdventure = async (payload: CreateAdventurePayload) =>
  makeAdminPost(`Adventure`, emptySchema, payload);

export const useAddAdventure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAdventurePayload) => addAdventure(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adventures"] });
    },
  });
};

//GET ADVENTURE DETAILS

type GetAdventureArgs = BuildGetArgs<{ adventureId: string }>;

const getAdventureDetails = ({ adventureId }: GetAdventureArgs) =>
  makeAdminGet(`Adventure/${adventureId}`, adventureDetailsResponseSchema);

export const useGetAdventureDetails = (adventureId: string) =>
  useQuery({
    queryKey: ["adventure", { adventureId }],
    queryFn: () => getAdventureDetails({ adventureId }),
    retry: false,
  });

//PUBLISH ADVENTURE

type PublishAdventure = BuildUpdateArgs<EmptyObject, AdventureIdParam>;

const publishAdventure = async ({ adventureId, payload }: PublishAdventure) =>
  makeAdminPatch(`Adventure/${adventureId}/publish`, emptySchema, payload);

export const usePublishAdventure = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adventureId }: AdventureIdParam) =>
      publishAdventure({ adventureId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adventure"],
      });
      queryClient.invalidateQueries({
        queryKey: ["adventures"],
        exact: false,
      });
    },
  });
};

//EDIT ADVENTURE

export type EditAdventurePayload = {
  title: string;
  description: string;
  seriesId: number;
  rpgSystemId: number;
  tagsIds: number[];
  charactersIds: number[];
};

const editAdventure = async (
  adventureId: string,
  payload: EditAdventurePayload
) => makeAdminPut(`Adventure/${adventureId}`, emptySchema, payload);

export const useEditAdventure = (adventureId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditAdventurePayload) =>
      editAdventure(adventureId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adventure"],
      });
      queryClient.invalidateQueries({
        queryKey: ["adventures"],
        exact: false,
      });
    },
  });
};
