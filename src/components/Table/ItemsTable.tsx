import { Button, Table, Typography } from "antd";
import React, { useState } from "react";
import { buildPagination, DEFAULT_TABLE_SIZE } from "../helpers";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";
import { useNav } from "../../routes/router";
import { ColumnType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import DeleteButton from "../UI/Buttons/DeleteButton";
import { useDeleteItem, useGetItems } from "../../api/items";

type ItemsData = {
  itemId: number;
  name: string;
  isPublished: boolean;
};

const { Text } = Typography;

export const ItemsTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, status, error } = useGetItems({
    pageSize: DEFAULT_TABLE_SIZE,
    pageNumber: page,
  });

  const { mutateAsync, status: DeleteStatus } = useDeleteItem();

  const { navigate } = useNav();

  const columns: ColumnType<ItemsData>[] = [
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
      render: (text, { itemId }) => (
        <>
          <Button
            type="default"
            key={itemId}
            style={{ marginRight: 10 }}
            onClick={() => navigate("editItem", { id: itemId.toString() })}
          >
            <EditOutlined />
          </Button>
          <DeleteButton<string>
            payload={itemId.toString()}
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
      rowKey={(item) => item.itemId}
      pagination={buildPagination(data, setPage)}
    />
  );
};
