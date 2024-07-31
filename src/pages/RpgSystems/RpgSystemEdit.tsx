import { WhiteTile } from "../../components/WhiteTile/WhiteTile.tsx";
import { usePageParams } from "../../hooks/usePageParams";
import { StatusAsyncHelper } from "../../components/AsyncHelper/StatusAsyncHelper.tsx";
import { useGetRpgSystem } from "../../api/rpgSystems.tsx";
import { RpgSystemDetails } from "../../components/RpgSystems/RpgSystemDetails.tsx";

export const RpgSystemEdit = () => {
  const params = usePageParams("editRpgSystem");

  const { data, error, status } = useGetRpgSystem(params.id);

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <WhiteTile title="Edutuj system RPG">
      <RpgSystemDetails data={data} />
    </WhiteTile>
  );
};
