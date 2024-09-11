import { WhiteTile } from "../../components/WhiteTile/WhiteTile.tsx";
import { usePageParams } from "../../hooks/usePageParams.tsx";
import { StatusAsyncHelper } from "../../components/AsyncHelper/StatusAsyncHelper.tsx";
import { useGetEventDetails } from "../../api/events.tsx";
import { EventDetails } from "../../components/Details/EventDetails.tsx";

export const EventEdit = () => {
  const params = usePageParams("editEvent");

  const { data, error, status } = useGetEventDetails(params.id);

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <WhiteTile title="Edytuj event">
      <EventDetails data={data} />
    </WhiteTile>
  );
};
