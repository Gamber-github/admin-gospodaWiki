import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  emptySchema,
  serieDetailsResponseSchema,
  seriesListResponseSchema,
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
import message from "antd/es/message";

export type SerieIdParam = {
  serieId: string;
};

//GET SERIES
type GetSeries = BuildGetArgs<undefined, OptionalPageParams>;

const getSeries = async ({ queryParams }: GetSeries) =>
  makeAdminGet(
    `Series${stringifyParams(queryParams)}`,
    seriesListResponseSchema
  );

export const useGetSeries = (queryParams: GetSeries["queryParams"] = {}) =>
  useQuery({
    queryKey: ["series"],
    queryFn: () => getSeries({ queryParams }),
    retry: false,
  });

//DELETE SERIES

type DeleteSeries = BuildUpdateArgs<EmptyObject, SerieIdParam>;

const deleteSeries = async ({ serieId, payload }: DeleteSeries) =>
  makeAdminDelete(`Series/${serieId}`, emptySchema, payload);

export const useDeleteSeries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ serieId }: SerieIdParam) =>
      deleteSeries({ serieId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries(["series"]);
      message.success("Rekord pomyślnie usunięty");
    },
  });
};

//CREATE SERIES

export type CreateSeriesPayload = {
  name: string;
  description: string;
  youtubePlaylistId: string;
};

const addSerie = async (payload: CreateSeriesPayload) =>
  makeAdminPost(`Series`, emptySchema, payload);

export const useAddSerie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSeriesPayload) => addSerie(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["series"] });
    },
  });
};

//GET SERIE

type GetSerie = BuildGetArgs<{ serieId: string }>;

const getSerie = async ({ serieId }: GetSerie) =>
  makeAdminGet(`Series/${serieId}`, serieDetailsResponseSchema);

export const useGetSerie = (serieId: string) =>
  useQuery({
    queryKey: ["serie", serieId],
    queryFn: () => getSerie({ serieId }),
    retry: false,
  });

//PUBLIC SERIE

type PublishSerie = BuildUpdateArgs<EmptyObject, SerieIdParam>;

const publishSerie = ({ serieId, payload }: PublishSerie) =>
  makeAdminPatch(`Series/${serieId}/publish`, emptySchema, payload);

export const usePublishSerie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ serieId }: SerieIdParam) =>
      publishSerie({ serieId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serie"] });
    },
  });
};

//EDIT SERIE

export type EditSeriePayload = {
  name: string;
  description: string;
  youtubePlaylistId: string;
  tagsId: number[];
  playersId: number[];
  charactersId: number[];
  rpgSystemId: number;
};

const editSerie = async (serieId: string, payload: EditSeriePayload) =>
  makeAdminPut(`Series/${serieId}`, emptySchema, payload);

export const useEditSerie = (serieId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditSeriePayload) => editSerie(serieId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serie", serieId] });
      queryClient.invalidateQueries({ queryKey: ["series"] });
      message.success("Rekord pomyślnie zaktualizowany");
    },
  });
};
