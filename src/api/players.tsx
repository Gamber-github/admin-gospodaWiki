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
} from "./responseSchemas";
import { EmptyObject } from "react-hook-form";

export type playerIdParam = {
  playerId: string;
};

//GET PLAYERS
type GetPlayers = BuildGetArgs<undefined, OptionalPageParams>;

const getPlayers = async ({ queryParams }: GetPlayers) =>
  makeAdminGet(
    `Player${stringifyParams(queryParams)}`,
    playersListResponseSchema
  );

export const usePlayers = (queryParams: GetPlayers["queryParams"] = {}) =>
  useQuery({
    queryKey: ["player"],
    queryFn: () => getPlayers({ queryParams }),
  });

//GET PLAYER

type GetPlayer = BuildGetArgs<{ playerId: string }>;

const getPlayer = ({ playerId }: GetPlayer) =>
  makeAdminGet(`Player/${playerId}`, playerDetailsResponseSchema);

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

export const addPlayer = async (payload: NewPlayerPayload) =>
  makeAdminPost("Player", emptySchema, payload);

export const useAddPlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewPlayerPayload) => addPlayer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player"] });
    },
  });
};

//PUBLISH PLAYER

export const PublishPlayer = (playerId: string) =>
  makeAdminPatch(`Player/${playerId}/publish`, emptySchema);

export const usePublishPlayer = (playerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => PublishPlayer(playerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player"] });
      queryClient.invalidateQueries({ queryKey: ["player", playerId] });
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

export const editPlayer = async (
  playerId: string,
  payload: EditPlayerPayload
) => makeAdminPut(`Player/${playerId}`, emptySchema, payload);

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

const deletePlayer = async ({ playerId, payload }: DeletePlayer) =>
  makeAdminDelete(`Player/${playerId}`, emptySchema, payload);

export const useDeletePlayer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ playerId }: playerIdParam) =>
      deletePlayer({ playerId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player"] });
    },
  });
};
