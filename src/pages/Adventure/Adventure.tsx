import { Button, Modal } from "antd";
import {
  ButtonContainer,
  Container,
} from "../../components/UI/CustomStyles/CustomStyles";
import { useModalProps } from "../../hooks/useModalProps";
import { UserAddOutlined } from "@ant-design/icons";
import { AdventuresTable } from "../../components/Table/AdventuresTable";
import { NewAdventureForm } from "../../components/Form/Adventure/NewAdventureForm";

export const Adventure = () => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={showModal}>
          <UserAddOutlined /> Dodaj nowe wydarzenie
        </Button>
      </ButtonContainer>
      <AdventuresTable />
      {isModalOpen && (
        <Modal onClose={closeModal} open footer={null} onCancel={closeModal}>
          <NewAdventureForm onSubmit={closeModal} />
        </Modal>
      )}
    </Container>
  );
};
