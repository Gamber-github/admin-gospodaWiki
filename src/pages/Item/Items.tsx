import { Button, Modal } from "antd";
import { Container } from "../../components/UI/CustomStyles/CustomStyles";
import { useModalProps } from "../../hooks/useModalProps";
import { UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ItemsTable } from "../../components/Table/ItemsTable";
import { NewItemForm } from "../../components/Form/Item/NewItemForm";

export const Items = () => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={showModal}>
          <UserAddOutlined /> Dodaj nowy przedmiot fabularny
        </Button>
      </ButtonContainer>
      <ItemsTable />
      {isModalOpen && (
        <Modal onClose={closeModal} open footer={null} onCancel={closeModal}>
          <NewItemForm onSubmit={closeModal} />
        </Modal>
      )}
    </Container>
  );
};

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
`;
