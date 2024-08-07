import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

type DeleteButtonProps<T> = {
  mutateAsync: UseMutateAsyncFunction<object, unknown, T, unknown>;
  status: unknown;
  payload: T;
};

export const DeleteButton = <T,>({
  mutateAsync,
  status,
  payload,
}: DeleteButtonProps<T>) => {
  return (
    <Popconfirm
      title="Jesteś pewien?"
      okText="Tak"
      okButtonProps={{ loading: status === "loading" }}
      cancelText="Nie"
      onConfirm={() => mutateAsync(payload)}
    >
      <Button type="default" danger>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default DeleteButton;
