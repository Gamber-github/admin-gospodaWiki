import { Button, Typography } from "antd";
import React, { useState } from "react";

import { buildPagination, DEFAULT_TABLE_SIZE } from "../helpers";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";
import { useNav } from "../../routes/router";
import Table, { ColumnType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import DeleteButton from "../UI/Buttons/DeleteButton";
import {
  characterIdParam,
  useDeleteCharacter,
  useGetCharacters,
} from "../../api/characters";

type CharacterData = {
  characterId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  rpgSystem: string;
  isPublished: boolean;
};

const { Text } = Typography;

export const CharactersTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, status, error } = useGetCharacters({
    pageSize: DEFAULT_TABLE_SIZE,
    pageNumber: page,
  });

  const { mutateAsync, status: deleteStatus } = useDeleteCharacter();

  const { navigate } = useNav();

  const columns: ColumnType<CharacterData>[] = [
    {
      title: "Imię i Nazwisko",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      render: (text, data) => <Text>{data.fullName}</Text>,
    },
    {
      title: "Występuje w",
      dataIndex: "rpgSystemName",
      key: "rpgSystemName",
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
      render: (text, { characterId }) => (
        <>
          <Button
            type="default"
            key={characterId}
            style={{ marginRight: 10 }}
            onClick={() =>
              navigate("editCharacter", { id: characterId.toString() })
            }
          >
            <EditOutlined />
          </Button>
          <DeleteButton<characterIdParam>
            mutateAsync={mutateAsync}
            payload={{ characterId: characterId.toString() }}
            status={deleteStatus}
          />
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
      rowKey={(item) => item.characterId}
      pagination={buildPagination(data, setPage)}
    />
  );
};
