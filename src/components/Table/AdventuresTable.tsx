import { Button, Table, Typography } from "antd";
import React, { useState } from "react";
import { buildPagination, DEFAULT_TABLE_SIZE } from "../helpers";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";
import { useNav } from "../../routes/router";
import { ColumnType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import DeleteButton from "../UI/Buttons/DeleteButton";
import { ButtonsConteiner } from "../UI/CustomStyles/CustomStyles";

import {
  AdventureIdParam,
  useDeleteAdventure,
  useGetAdventures,
} from "../../api/adventure";

type TableData = {
  title: string;
  isPublished: boolean;
  adventureId: number;
};

const { Text } = Typography;

export const AdventuresTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, status, error } = useGetAdventures({
    pageSize: DEFAULT_TABLE_SIZE,
    pageNumber: page,
  });

  const { mutateAsync, status: DeleteStatus } = useDeleteAdventure();

  const { navigate } = useNav();

  const columns: ColumnType<TableData>[] = [
    {
      title: "Nazwa",
      dataIndex: "title",
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
      render: (_, { adventureId }) => (
        <ButtonsConteiner>
          <Button
            type="default"
            key={adventureId}
            onClick={() =>
              navigate("editAdventure", { id: adventureId.toString() })
            }
          >
            <EditOutlined />
          </Button>
          <DeleteButton<AdventureIdParam>
            payload={{ adventureId: adventureId.toString() }}
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
      rowKey={(item) => item.adventureId}
      pagination={buildPagination(data, setPage)}
    />
  );
};