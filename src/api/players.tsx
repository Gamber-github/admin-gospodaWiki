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
  playerDetailsResponseSchema,
  playersListResponseSchema,
} from "./ResponseSchema/responseSchemas";
import { EmptyObject } from "react-hook-form";

export type playerIdParam = {
  playerId: string;
};

//GET PLAYERS
type GetPlayers = BuildGetArgs<object, OptionalPageParams>;

const getPlayers = (queryParams: GetPlayers["queryParams"]) =>
  makeAdminGet(
    `player${stringifyParams(queryParams)}`,
    playersListResponseSchema
  );

export const useGetPlayers = (queryParams: GetPlayers["queryParams"] = {}) =>
  useQuery({
    queryKey: ["players"],
    queryFn: () => getPlayers(queryParams),
  });

//GET PLAYER

type GetPlayer = BuildGetArgs<{ playerId: string }>;

const getPlayer = ({ playerId }: GetPlayer) =>
  makeAdminGet(`player/${playerId}`, playerDetailsResponseSchema);

export const useGetPlayer = (playerId: string) =>
  useQuery({
    queryKey: ["player", playerId],
    queryFn: () => getPlayer({ playerId }),
  });

//CREATE PLAYER

export type NewPlayerPayload = {
  firstName: string;
  lastName: string;
};

const addPlayer = (payload: NewPlayerPayload) =>
  makeAdminPost("Player", emptySchema, payload);

export const useAddPlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewPlayerPayload) => addPlayer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
};

//PUBLISH PLAYER

type PublishPlayer = BuildUpdateArgs<EmptyObject, playerIdParam>;

export const PublishPlayer = ({ playerId, payload }: PublishPlayer) =>
  makeAdminPatch(`Player/${playerId}/publish`, emptySchema, payload);

export const usePublishPlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playerId }: playerIdParam) =>
      PublishPlayer({ playerId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["players"], exact: false });
    },
  });
};

//EDIT PLAYER

export type EditPlayerPayload = {
  firstName: string;
  lastName: string;
  age: number;
  about: string;
};

export const editPlayer = (playerId: string, payload: EditPlayerPayload) =>
  makeAdminPut(`Player/${playerId}`, emptySchema, payload);

export const useEditPlayer = (playerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditPlayerPayload) => editPlayer(playerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player", playerId] });
    },
  });
};

//DELETE PLAYER

type DeletePlayer = BuildUpdateArgs<EmptyObject, playerIdParam>;

const deletePlayer = ({ playerId, payload }: DeletePlayer) =>
  makeAdminDelete(`Player/${playerId}`, emptySchema, payload);

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playerId }: playerIdParam) =>
      deletePlayer({ playerId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["players"] });
    },
  });
};
