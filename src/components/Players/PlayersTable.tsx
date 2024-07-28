import { Button, Table, Typography } from "antd";
import React, { useState } from "react";
import { usePlayers } from "../../api/players";

import { buildPagination } from "../helpers";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";
import { useNav } from "../../routes/router";
import { ColumnType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import DeletePlayerButton from "./DeletePlayerButton";

type PlayerData = {
  playerId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  isPublished: boolean;
};

const { Text } = Typography;

export const PlayersTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, status, error } = usePlayers({
    pageSize: 10,
    pageNumber: page,
  });

  const { navigate } = useNav();

  const columns: ColumnType<PlayerData>[] = [
    {
      title: "Imię i Nazwisko",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      render: (text, data) => (
        <Text>{data.firstName + " " + data.lastName}</Text>
      ),
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
      render: (text, { playerId }) => (
        <>
          <Button
            type="default"
            key={playerId}
            style={{ marginRight: 10 }}
            onClick={() =>
              navigate("editPlayer", { playerId: playerId.toString() })
            }
          >
            <EditOutlined />
          </Button>
          <DeletePlayerButton playerId={playerId.toString()} />
        </>
      ),
    },
  ];

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <Table
      columns={columns}
      dataSource={data.items}
      rowKey={(item) => item.playerId}
      pagination={buildPagination(data, setPage)}
    />
  );
};
