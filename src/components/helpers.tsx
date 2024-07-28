import { Dispatch, SetStateAction } from "react";

export const buildPagination = (
  data: { pageSize: number; totalItemCount: number },
  setPage: Dispatch<SetStateAction<number>>
) => {
  return data.totalItemCount > 10
    ? {
        pagesize: data.pageSize,
        total: data.totalItemCount,
        onChange: setPage,
        showSizeChanger: false,
      }
    : false;
};
