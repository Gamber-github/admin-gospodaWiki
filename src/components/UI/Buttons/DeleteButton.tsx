import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

type DeleteButtonProps<T> = {
  mutateAsync: UseMutateAsyncFunction<unknown, unknown, T, unknown>;
  status: unknown;
  payload: T;
};

export const DeleteButton = <T,>({
  mutateAsync,
  status,
  payload,
}: DeleteButtonProps<T>) => {

  const handleDelete = async () => {
    try {
      await mutateAsync(payload);
      message.success("Rekord pomyślnie usnunięty");
    } catch (error) {
      message.error("Nie udało się usunąć rekordu. Spróbuj ponownie");
    }
  };

  return (
    <Popconfirm
      title="Jesteś pewien?"
      okText="Tak"
      okButtonProps={{ loading: status === "loading" }}
      cancelText="Nie"
      onConfirm={handleDelete}
    >
      <Button type="default" danger>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default DeleteButton;
