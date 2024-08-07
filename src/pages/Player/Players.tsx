import { Button, Modal } from "antd";
import { PlayersTable } from "../../components/Table/PlayersTable";
import { Container } from "../../components/UI/CustomStyles/CustomStyles";
import { useModalProps } from "../../hooks/useModalProps";
import { UserAddOutlined } from "@ant-design/icons";

import styled from "styled-components";
import { NewPlayerForm } from "../../components/Form/Player/NewPlayerForm";

export const Players = () => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={showModal}>
          <UserAddOutlined /> Dodaj nowego gracza
        </Button>
      </ButtonContainer>
      <PlayersTable />
      {isModalOpen && (
        <Modal onClose={closeModal} open footer={null} onCancel={closeModal}>
          <NewPlayerForm onSubmit={closeModal} />
        </Modal>
      )}
    </Container>
  );
};

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
`;
