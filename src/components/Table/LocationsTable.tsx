import { Button, Table, Typography } from "antd";
import React, { useState } from "react";
import { buildPagination, DEFAULT_TABLE_SIZE } from "../helpers";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";
import { useNav } from "../../routes/router";
import { ColumnType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import DeleteButton from "../UI/Buttons/DeleteButton";
import { ButtonsConteiner } from "../UI/CustomStyles/CustomStyles";
import { DefaultTableData } from "./utils";
import {
  LocationIdParam,
  useDeleteLocation,
  useGetLocations,
} from "../../api/locations";

type TableData = DefaultTableData & { locationId: number };

const { Text } = Typography;

export const LocationsTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, status, error } = useGetLocations({
    pageSize: DEFAULT_TABLE_SIZE,
    pageNumber: page,
  });

  const { mutateAsync, status: DeleteStatus } = useDeleteLocation();

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
      render: (_, { locationId }) => (
        <ButtonsConteiner>
          <Button
            type="default"
            key={locationId}
            onClick={() =>
              navigate("editLocation", { id: locationId.toString() })
            }
          >
            <EditOutlined />
          </Button>
          <DeleteButton<LocationIdParam>
            payload={{ locationId: locationId.toString() }}
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
    <Table<TableData>
      columns={columns}
      dataSource={data.items}
      rowKey={(item) => item.locationId}
      pagination={buildPagination(data, setPage)}
    />
  );
};
