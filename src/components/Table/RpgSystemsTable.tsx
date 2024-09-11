import { Button, Table, Typography } from "antd";
import React, { useState } from "react";
import { buildPagination, DEFAULT_TABLE_SIZE } from "../helpers";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";
import { useNav } from "../../routes/router";
import { ColumnType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import DeleteButton from "../UI/Buttons/DeleteButton";
import {
  RpgSystemIdParam,
  useDeleteRpgSystem,
  useGetRpgSystems,
} from "../../api/rpgSystems";
import { DefaultTableData } from "./utils";

type TableData = DefaultTableData & { rpgSystemId: number };

const { Text } = Typography;

export const RpgSystemsTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, status, error } = useGetRpgSystems({
    pageSize: DEFAULT_TABLE_SIZE,
    pageNumber: page,
  });

  const { mutateAsync, status: DeleteStatus } = useDeleteRpgSystem();

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
      render: (text, { rpgSystemId }) => (
        <>
          <Button
            type="default"
            key={rpgSystemId}
            style={{ marginRight: 10 }}
            onClick={() =>
              navigate("editRpgSystem", { id: rpgSystemId.toString() })
            }
          >
            <EditOutlined />
          </Button>
          <DeleteButton<RpgSystemIdParam>
            payload={{ rpgSystemId: rpgSystemId.toString() }}
            mutateAsync={mutateAsync}
            status={DeleteStatus}
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
      rowKey={(item) => item.rpgSystemId}
      pagination={buildPagination(data, setPage)}
    />
  );
};
