import { Dispatch, SetStateAction } from "react";

export const DEFAULT_TABLE_SIZE = 10;
export const buildPagination = (
  data: { pageSize: number; totalItemCount: number },
  setPage: Dispatch<SetStateAction<number>>
) => {
  return data.totalItemCount > DEFAULT_TABLE_SIZE
    ? {
        pageSize: data.pageSize,
        total: data.totalItemCount,
        onChange: setPage,
        showSizeChanger: false,
      }
    : false;
};
