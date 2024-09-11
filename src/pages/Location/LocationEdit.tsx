import { WhiteTile } from "../../components/WhiteTile/WhiteTile.tsx";
import { usePageParams } from "../../hooks/usePageParams.tsx";
import { StatusAsyncHelper } from "../../components/AsyncHelper/StatusAsyncHelper.tsx";
import { LocationDetails } from "../../components/Details/LocationDetails.tsx";
import { useGetLocationDetails } from "../../api/locations.tsx";

export const LocationEdit = () => {
  const params = usePageParams("editEvent");

  const { data, error, status } = useGetLocationDetails(params.id);

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <WhiteTile title="Edytuj lokację">
      <LocationDetails data={data} />
    </WhiteTile>
  );
};
