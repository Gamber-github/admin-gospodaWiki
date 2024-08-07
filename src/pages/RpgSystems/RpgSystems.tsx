import { Button, Modal } from "antd";

import { Container } from "../../components/UI/CustomStyles/CustomStyles";
import { useModalProps } from "../../hooks/useModalProps";
import { UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { RpgSystemsTable } from "../../components/Table/RpgSystemsTable";
import { NewRpgSystemForm } from "../../components/Form/RpgSystem/NewRpgSystemForm";

export const RpgSystems = () => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={showModal}>
          <UserAddOutlined /> Dodaj nowy system RPG
        </Button>
      </ButtonContainer>
      <RpgSystemsTable />
      {isModalOpen && (
        <Modal onClose={closeModal} open footer={null} onCancel={closeModal}>
          <NewRpgSystemForm onSubmit={closeModal} />
        </Modal>
      )}
    </Container>
  );
};

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
`;
