import Button from "antd/es/button";
import message from "antd/es/message";
import Popconfirm from "antd/es/popconfirm";

type DetailsPanelProps = {
  showModal: () => void;
  publish: () => void;
  status: string;
  isPublished: boolean;
  error: unknown;
};

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
  error,
  isPublished,
  publish,
  showModal,
  status,
}) => {
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Edytuj
      </Button>
      <Popconfirm
        title="Jesteś pewien?"
        okText="Tak"
        okButtonProps={{ loading: status === "loading" }}
        cancelText="Nie"
        onConfirm={publish}
      >
        <Button type="dashed">{!isPublished ? "Opublikuj" : "Ukryj"}</Button>
      </Popconfirm>
      {error && message.error("Coś poszło nie tak")}
    </>
  );
};
