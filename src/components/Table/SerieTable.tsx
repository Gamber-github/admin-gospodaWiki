import { Button, Table, Typography } from "antd";
import React, { useState } from "react";
import { buildPagination, DEFAULT_TABLE_SIZE } from "../helpers";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";
import { useNav } from "../../routes/router";
import { ColumnType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import DeleteButton from "../UI/Buttons/DeleteButton";
import { SerieIdParam, useDeleteSeries, useGetSeries } from "../../api/series";
import { ButtonsConteiner } from "../UI/CustomStyles/CustomStyles";
import { DefaultTableData } from "./utils";

type TableData = DefaultTableData & { seriesId: number };

const { Text } = Typography;

export const SerieTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, status, error } = useGetSeries({
    pageSize: DEFAULT_TABLE_SIZE,
    pageNumber: page,
  });

  const { mutateAsync, status: DeleteStatus } = useDeleteSeries();

  const { navigate } = useNav();

  const columns: ColumnType<TableData>[] = [
    {
      title: "Nazwa",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text) => <Text>{text}</Text>,
    },
    {
      title: "Opublikowany",
      dataIndex: "isPublished",
      key: "isPublished",
      align: "center",
      render: (isPublished) => (isPublished ? "Tak" : "Nie"),
    },
    {
      title: "Akcje",
      key: "action",
      align: "center",
      render: (text, { seriesId }) => (
        <ButtonsConteiner>
          <Button
            type="default"
            key={seriesId}
            onClick={() => navigate("editSerie", { id: seriesId.toString() })}
          >
            <EditOutlined />
          </Button>
          <DeleteButton<SerieIdParam>
            payload={{ serieId: seriesId.toString() }}
            mutateAsync={mutateAsync}
            status={DeleteStatus}
          />
        </ButtonsConteiner>
      ),
    },
  ];

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <Table
      columns={columns}
      dataSource={data.items}
      rowKey={(item) => item.seriesId}
      pagination={buildPagination(data, setPage)}
    />
  );
};
