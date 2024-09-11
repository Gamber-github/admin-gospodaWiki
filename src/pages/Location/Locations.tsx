import { Button, Modal } from "antd";
import {
  ButtonContainer,
  Container,
} from "../../components/UI/CustomStyles/CustomStyles";
import { useModalProps } from "../../hooks/useModalProps";
import { UserAddOutlined } from "@ant-design/icons";
import { LocationsTable } from "../../components/Table/LocationsTable";
import { NewLocationForm } from "../../components/Form/Location/NewLocationForm";

export const Locations = () => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={showModal}>
          <UserAddOutlined /> Dodaj nową lokację
        </Button>
      </ButtonContainer>
      <LocationsTable />
      {isModalOpen && (
        <Modal onClose={closeModal} open footer={null} onCancel={closeModal}>
          <NewLocationForm onSubmit={closeModal} />
        </Modal>
      )}
    </Container>
  );
};
