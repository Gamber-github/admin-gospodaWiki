import { WhiteTile } from "../../components/WhiteTile/WhiteTile.tsx";
import { useGetPlayer } from "../../api/players";
import { usePageParams } from "../../hooks/usePageParams";
import { StatusAsyncHelper } from "../../components/AsyncHelper/StatusAsyncHelper.tsx";
import { PlayerDetails } from "../../components/Players/PlayerDetails";

export const PlayerEdit = () => {
  const params = usePageParams("editPlayer");

  const { data, error, status } = useGetPlayer(params.playerId);

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <WhiteTile title="Edutuj gracza">
      <PlayerDetails data={data} />
    </WhiteTile>
  );
};
