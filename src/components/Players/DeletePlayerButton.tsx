import React from "react";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeletePlayer } from "../../api/players";

export const DeletePlayerButton: React.FC<{ playerId: string }> = ({
  playerId,
}) => {
  const { mutateAsync, status: deleteStatus } = useDeletePlayer();

  const handleDelete = async () => {
    try {
      await mutateAsync({ playerId });
      message.success("Gracz pomyślnie usnunięty");
    } catch (error) {
      message.error("Nie udało się usunąć gracza. Spróbuj ponownie");
    }
  };

  return (
    <Popconfirm
      title="Jesteś pewien?"
      okText="Tak"
      okButtonProps={{ loading: deleteStatus === "loading" }}
      cancelText="Nie"
      onConfirm={handleDelete}
    >
      <Button type="default" danger>
        <DeleteOutlined />
      </Button>
    </Popconfirm>
  );
};

export default DeletePlayerButton;
