import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  emptySchema,
  eventDetailsResponseSchema,
  EventsListResponseSchema,
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

export type EventIdParam = {
  eventId: string;
};

//GET Events
type GetEvents = BuildGetArgs<undefined, OptionalPageParams>;

const getEvents = async ({ queryParams }: GetEvents) =>
  makeAdminGet(
    `Event${stringifyParams(queryParams)}`,
    EventsListResponseSchema
  );

export const useGetEvents = (queryParams: GetEvents["queryParams"] = {}) =>
  useQuery({
    queryKey: ["events"],
    queryFn: () => getEvents({ queryParams }),
    retry: false,
  });

//DELETE EVENT

type DeleteEvent = BuildUpdateArgs<EmptyObject, EventIdParam>;

const deleteEvent = async ({ eventId, payload }: DeleteEvent) =>
  makeAdminDelete(`Event/${eventId}`, emptySchema, payload);

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId }: EventIdParam) =>
      deleteEvent({ eventId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      message.success("Rekord pomyślnie usunięty");
    },
  });
};

//CREATE EVENT

export type CreateEventPayload = {
  name: string;
  description?: string;
  eventUrl?: string;
  imagePath?: string;
  date?: string;
};

const addEvent = async (payload: CreateEventPayload) =>
  makeAdminPost("Event", emptySchema, payload);

export const useAddEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateEventPayload) => addEvent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      message.success("Rekord pomyślnie dodany");
    },
  });
};

//GET EVENT DETAILS

type GetEvent = BuildGetArgs<{ eventId: string }>;

const getEventDetails = async ({ eventId }: GetEvent) =>
  makeAdminGet(`Event/${eventId}`, eventDetailsResponseSchema);

export const useGetEventDetails = (eventId: string) =>
  useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getEventDetails({ eventId }),
    retry: false,
  });

//PUBLISH EVENT

type PublishEvent = BuildUpdateArgs<EmptyObject, EventIdParam>;

const publishEvent = async ({ eventId, payload }: PublishEvent) =>
  makeAdminPatch(`Event/${eventId}/publish`, emptySchema, payload);

export const usePublishEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ eventId }: EventIdParam) =>
      publishEvent({ eventId, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      message.success("Rekord pomyślnie opublikowany");
    },
  });
};

//EDIT EVENT

export type EditEventPayload = {
  name: string;
  description: string;
  eventUrl: string;
  date: string;
  locationId: number;
  tagsIds: number[];
};

const editEvent = async (eventId: string, payload: EditEventPayload) =>
  makeAdminPut(`Event/${eventId}`, emptySchema, payload);

export const useEditEvent = (eventId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EditEventPayload) => editEvent(eventId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      message.success("Rekord pomyślnie zaktualizowany");
    },
  });
};
