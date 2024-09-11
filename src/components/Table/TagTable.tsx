import { Button, Table, Input } from "antd";
import React, { useState } from "react";
import { buildPagination, DEFAULT_TABLE_SIZE } from "../helpers";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";
import { ColumnType } from "antd/es/table";
import {
  CloseOutlined,
  CloudUploadOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import DeleteButton from "../UI/Buttons/DeleteButton";
import {
  TagIdParam,
  useDeleteTag,
  useGetTags,
  usePublishTag,
  useEditTag,
} from "../../api/tags";
import { ButtonsConteiner } from "../UI/CustomStyles/CustomStyles";
import { DefaultTableData } from "./utils";

type TableData = DefaultTableData & { tagId: number };

export const TagsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const { data, status, error } = useGetTags({
    pageSize: DEFAULT_TABLE_SIZE,
    pageNumber: page,
  });

  const { mutateAsync: publishTag } = usePublishTag();
  const { mutateAsync: editTag } = useEditTag(editingKey || "");
  const { mutateAsync, status: DeleteStatus } = useDeleteTag();

  const handleEdit = (record: TableData) => {
    setEditingKey(record.tagId.toString());
    setEditingValue(record.name);
  };

  const handleSave = async () => {
    if (editingKey) {
      await editTag({ name: editingValue });
      setEditingKey(null);
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handleSave();
    }
  };

  const columns: ColumnType<TableData>[] = [
    {
      title: "Nazwa",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text: string, record: TableData) => {
        if (editingKey === record.tagId.toString()) {
          return (
            <Input
              value={editingValue}
              onChange={(e) => setEditingValue(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          );
        }
        return text;
      },
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
      render: (_: unknown, record: TableData) => {
        if (editingKey === record.tagId.toString()) {
          return (
            <ButtonsConteiner>
              <Button type="default" onClick={handleSave}>
                <SaveOutlined />
              </Button>
              <Button type="default" onClick={handleCancel} danger>
                <CloseOutlined />
              </Button>
            </ButtonsConteiner>
          );
        }
        return (
          <ButtonsConteiner>
            <Button
              type="default"
              key={record.tagId}
              onClick={() => handleEdit(record)}
            >
              <EditOutlined />
            </Button>
            <Button
              type="default"
              onClick={() => publishTag({ tagId: record.tagId.toString() })}
            >
              {!record.isPublished ? (
                <CloudUploadOutlined />
              ) : (
                <EyeInvisibleOutlined />
              )}
            </Button>
            <DeleteButton<TagIdParam>
              payload={{ tagId: record.tagId.toString() }}
              mutateAsync={mutateAsync}
              status={DeleteStatus}
            />
          </ButtonsConteiner>
        );
      },
    },
  ];

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  return (
    <Table
      columns={columns}
      dataSource={data.items}
      rowKey={(item) => item.tagId}
      pagination={buildPagination(data, setPage)}
    />
  );
};
