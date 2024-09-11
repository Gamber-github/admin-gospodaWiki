import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BuildGetArgs,
  BuildUpdateArgs,
  OptionalPageParams,
} from "./utils/types";
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
  locationDetailsResponseSchema,
  locationsListResponseSchema,
} from "./ResponseSchema/responseSchemas";
import { EmptyObject } from "react-hook-form";
import message from "antd/es/message";

export type LocationIdParam = {
  locationId: string;
};

//GET LOCATIONS
type GetLocations = BuildGetArgs<undefined, OptionalPageParams>;

const getLocations = async ({ queryParams }: GetLocations) =>
  makeAdminGet(
    `Location${stringifyParams(queryParams)}`,
    locationsListResponseSchema
  );

export const useGetLocations = (
  queryParams: GetLocations["queryParams"] = {}
) =>
  useQuery({
    queryKey: ["locations"],
    queryFn: () => getLocations({ queryParams }),
    retry: false,
  });

//DELETE LOCATION

type DeleteLocation = BuildUpdateArgs<EmptyObject, LocationIdParam>;

const deleteLocation = async ({ locationId, payload }: DeleteLocation) =>
  makeAdminDelete(`Location/${locationId}`, emptySchema, payload);

export const useDeleteLocation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ locationId }: LocationIdParam) =>
      deleteLocation({ locationId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      message.success("Rekord pomyślnie usunięty");
    },
  });
};

//CREATE LOCATION
export type CreateLocationPayload = {
  name?: string;
  address?: string;
  city?: string;
  locationURL?: string;
};

const addLocation = async (payload: CreateLocationPayload) =>
  makeAdminPost("Location", emptySchema, payload);

export const useAddLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLocationPayload) => addLocation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      message.success("Rekord pomyślnie dodany");
    },
  });
};

//GET LOCATION DETAILS

type GetLocation = BuildGetArgs<{ locationId: string }>;

const getLocation = async ({ locationId }: GetLocation) =>
  makeAdminGet(`Location/${locationId}`, locationDetailsResponseSchema);

export const useGetLocationDetails = (locationId: string) =>
  useQuery({
    queryKey: ["location", locationId],
    queryFn: () => getLocation({ locationId }),
    retry: false,
  });

//PUBLISH LOCATION

type PublishLocation = BuildUpdateArgs<EmptyObject, LocationIdParam>;

const publishLocation = async ({ locationId, payload }: PublishLocation) =>
  makeAdminPatch(`Location/${locationId}/publish`, emptySchema, payload);

export const usePublishLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ locationId }: LocationIdParam) =>
      publishLocation({ locationId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["location"] });
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      message.success("Zaktualizowano status publikacji");
    },
  });
};

//EDIT LOCATION

export type EditLocationPayload = {
  name: string;
  address: string;
  city: string;
  locationUrl: string;
  eventIds: number[];
};

const editLocation = async (locationId: string, payload: EditLocationPayload) =>
  makeAdminPut(`Location/${locationId}`, emptySchema, payload);

export const useEditLocation = (locationId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditLocationPayload) =>
      editLocation(locationId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["location", locationId] });
      message.success("Rekord pomyślnie zaktualizowany");
    },
  });
};
