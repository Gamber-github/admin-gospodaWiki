export type OptionalPageParams = {
  pageSize?: number;
  pageNumber?: number;
};

export type BuildGetArgs<
  PathArgs = undefined,
  QueryParams = undefined
> = (PathArgs extends undefined ? unknown : PathArgs) &
  (QueryParams extends undefined ? unknown : { queryParams: QueryParams });

  