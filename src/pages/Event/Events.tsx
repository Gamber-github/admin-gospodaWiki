import { Button, Modal } from "antd";
import { Container } from "../../components/UI/CustomStyles/CustomStyles";
import { useModalProps } from "../../hooks/useModalProps";
import { UserAddOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { EventsTable } from "../../components/Table/EventsTable";
import { NewEventForm } from "../../components/Form/Event/NewEventForm";

export const Events = () => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={showModal}>
          <UserAddOutlined /> Dodaj nowy event
        </Button>
      </ButtonContainer>
      <EventsTable />
      {isModalOpen && (
        <Modal onClose={closeModal} open footer={null} onCancel={closeModal}>
          <NewEventForm onSubmit={closeModal} />
        </Modal>
      )}
    </Container>
  );
};

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
`;
