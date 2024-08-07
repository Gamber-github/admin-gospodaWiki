import { WhiteTile } from "../../components/WhiteTile/WhiteTile.tsx";
import { usePageParams } from "../../hooks/usePageParams.tsx";
import { StatusAsyncHelper } from "../../components/AsyncHelper/StatusAsyncHelper.tsx";
import { useGetCharacter } from "../../api/characters.tsx";
import { CharacterDetails } from "../../components/Details/CharacterDetails.tsx";

export const CharacterEdit = () => {
  const params = usePageParams("editCharacter");

  const { data, error, status } = useGetCharacter(params.id);

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <WhiteTile title="Edytuj postać">
      <CharacterDetails data={data} />
    </WhiteTile>
  );
};
