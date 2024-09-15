import { WhiteTile } from "../../components/WhiteTile/WhiteTile.tsx";
import { usePageParams } from "../../hooks/usePageParams.tsx";
import { StatusAsyncHelper } from "../../components/AsyncHelper/StatusAsyncHelper.tsx";

import { useGetAdventureDetails } from "../../api/adventure.tsx";
import { AdventureDetails } from "../../components/Details/AdventureDetails.tsx";

export const AdventureEdit = () => {
  const params = usePageParams("editAdventure");

  const { data, error, status } = useGetAdventureDetails(params.id);

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <WhiteTile title="Edytuj wydarzenie">
      <AdventureDetails data={data} />
    </WhiteTile>
  );
};
