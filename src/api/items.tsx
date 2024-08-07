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
  itemDetailsResponseSchema,
  ItemsResponseSchema,
} from "./ResponseSchema/responseSchemas";
import {
  BuildGetArgs,
  BuildUpdateArgs,
  OptionalPageParams,
} from "./utils/types";
import { EmptyObject } from "react-hook-form";
import message from "antd/es/message";

export type ItemIdParam = {
  id: string;
};

//GET ITEMS
type GetItems = BuildGetArgs<undefined, OptionalPageParams>;

const getItems = ({ queryParams }: GetItems) =>
  makeAdminGet(`Item${stringifyParams(queryParams)}`, ItemsResponseSchema);

export const useGetItems = (queryParams: GetItems["queryParams"] = {}) =>
  useQuery({
    queryKey: ["items"],
    queryFn: () => getItems({ queryParams }),
    retry: false,
  });

//DELETE ITEM

const deleteItem = (itemId: string) =>
  makeAdminDelete(`Item/${itemId}`, emptySchema, {});

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => deleteItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      message.success("Rekord usunięty");
    },
  });
};

//CREATE ITEM

type ItemPyload = {
  name: string;
  description: string;
};

const createItem = (payload: ItemPyload) =>
  makeAdminPost(`Item`, emptySchema, payload);

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ItemPyload) => createItem(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

//ITEM DETAILS

type ItemDetailsArgs = BuildGetArgs<{ itemId: string }>;

const getItemDetails = ({ itemId }: ItemDetailsArgs) =>
  makeAdminGet(`Item/${itemId}`, itemDetailsResponseSchema);

export const useGetItemDetails = (itemId: string) => {
  return useQuery({
    queryKey: ["item"],
    queryFn: () => getItemDetails({ itemId }),
    retry: false,
    enabled: !!itemId,
  });
};

//ITEM PUBLISH

type PublishItemArgs = BuildUpdateArgs<EmptyObject, ItemIdParam>;

const publishItem = ({ id, payload }: PublishItemArgs) =>
  makeAdminPatch(`Item/${id}/publish`, emptySchema, payload);

export const usePublishItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: ItemIdParam) => publishItem({ id, payload: {} }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["item"],
      });
    },
  });
};

//EDIT ITEM
type ItemPayload = {
  name: string;
  description: string;
  tagIds: number[];
};

const editItem = async (itemId: string, payload: ItemPayload) =>
  makeAdminPut(`Item/${itemId}`, emptySchema, payload);

export const useEditItem = (itemId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ItemPayload) => editItem(itemId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["item"],
      });
      queryClient.invalidateQueries({
        queryKey: ["items"],
        exact: false,
      });
    },
  });
};
