import { Button, Modal } from "antd";
import { Container } from "../../components/UI/CustomStyles/CustomStyles";
import { useModalProps } from "../../hooks/useModalProps";
import { UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { CharactersTable } from "../../components/Characters/CharactersTable";
import { NewCharacterForm } from "../../components/Characters/NewCharacterForm";

export const Characters = () => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={showModal}>
          <UserAddOutlined /> Dodaj nową postać
        </Button>
      </ButtonContainer>
      <CharactersTable />
      {isModalOpen && (
        <Modal onClose={closeModal} open footer={null} onCancel={closeModal}>
          <NewCharacterForm onSubmit={closeModal} />
        </Modal>
      )}
    </Container>
  );
};

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
`;
