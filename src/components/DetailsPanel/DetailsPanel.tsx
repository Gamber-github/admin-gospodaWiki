import Button from "antd/es/button";
import Popconfirm from "antd/es/popconfirm";

type DetailsPanelProps = {
  showModal: () => void;
  publish: () => void;
  status: string;
  isPublished: boolean;
};

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
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
    </>
  );
};
