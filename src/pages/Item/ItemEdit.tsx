import { WhiteTile } from "../../components/WhiteTile/WhiteTile.tsx";
import { usePageParams } from "../../hooks/usePageParams.tsx";
import { StatusAsyncHelper } from "../../components/AsyncHelper/StatusAsyncHelper.tsx";
import { useGetItemDetails } from "../../api/items.tsx";
import { ItemDetails } from "../../components/Details/ItemDetails.tsx";

export const ItemEdit = () => {
  const params = usePageParams("editItem");

  const { data, error, status } = useGetItemDetails(params.id);

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <WhiteTile title="Edutuj gracza">
      <ItemDetails data={data} />
    </WhiteTile>
  );
};
