import { WhiteTile } from "../../components/WhiteTile/WhiteTile.tsx";
import { usePageParams } from "../../hooks/usePageParams";
import { StatusAsyncHelper } from "../../components/AsyncHelper/StatusAsyncHelper.tsx";
import { useGetSerie } from "../../api/series.tsx";
import { SerieDetails } from "../../components/Series/SerieDetails.tsx";

export const SeriesEdit = () => {
  const params = usePageParams("editRpgSystem");

  const { data, error, status } = useGetSerie(params.id);

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <WhiteTile title="Edutuj Serię">
      <SerieDetails data={data} />
    </WhiteTile>
  );
};
