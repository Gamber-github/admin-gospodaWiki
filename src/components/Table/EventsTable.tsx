import { Button, Table, Typography } from "antd";
import React, { useState } from "react";
import { buildPagination, DEFAULT_TABLE_SIZE } from "../helpers";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";
import { useNav } from "../../routes/router";
import { ColumnType } from "antd/es/table";
import { EditOutlined } from "@ant-design/icons";
import DeleteButton from "../UI/Buttons/DeleteButton";
import { EventIdParam } from "../../api/events";
import { ButtonsConteiner } from "../UI/CustomStyles/CustomStyles";
import { useDeleteEvent, useGetEvents } from "../../api/events";

type EventData = {
  eventId: number;
  name: string;
  isPublished: boolean;
};

const { Text } = Typography;

export const EventsTable: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, status, error } = useGetEvents({
    pageSize: DEFAULT_TABLE_SIZE,
    pageNumber: page,
  });

  const { mutateAsync, status: DeleteStatus } = useDeleteEvent();

  const { navigate } = useNav();

  const columns: ColumnType<EventData>[] = [
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
      render: (text, { eventId }) => (
        <ButtonsConteiner>
          <Button
            type="default"
            key={eventId}
            onClick={() => navigate("editEvent", { id: eventId.toString() })}
          >
            <EditOutlined />
          </Button>
          <DeleteButton<EventIdParam>
            payload={{ eventId: eventId.toString() }}
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
      rowKey={(item) => item.eventId}
      pagination={buildPagination(data, setPage)}
    />
  );
};
