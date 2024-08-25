import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import React from "react";

import Badge from "antd/es/badge";
import styled from "styled-components";
import Button from "antd/es/button";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import Popconfirm from "antd/es/popconfirm";
import message from "antd/es/message";
import { EventDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import { usePublishEvent } from "../../api/events";
import { EditEventForm } from "../Form/Event/EditEventForm";

export const EventDetails: React.FC<{
  data: EventDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const { mutateAsync: publishMutateAsync, error, status } = usePublishEvent();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Nazwa",
      children: <p>{data.name}</p>,
    },
    {
      key: "2",
      label: "Opublikowany",
      children: (
        <Badge
          status={data.isPublished ? "success" : "processing"}
          text={data.isPublished ? "Tak" : "Nie"}
        />
      ),
    },
    {
      key: "3",
      label: "Data rozpoczęcia",
      children: <p>{data.date}</p>,
    },
    {
      key: "4",
      label: "Miejsce",
      children: <p>{data.location.name}</p>,
    },
    {
      key: "5",
      label: "URL wydarzenia",
      children: <p>{data.eventUrl}</p>,
    },
    {
      key: "6",
      label: "Tagi",
      children: (
        <>
          {data.tags.map((tag, key) => (
            <p key={key}>{tag.name}</p>
          ))}
        </>
      ),
    },
    {
      key: "7",
      label: "Opis",
      span: 2,
      children: <p>{data.description}</p>,
    },
  ];

  return (
    <Conatiner>
      <Descriptions
        items={items}
        bordered
        column={3}
        extra={
          <>
            <Button type="primary" onClick={showModal}>
              Edytuj
            </Button>
            <Popconfirm
              title="Jesteś pewien?"
              okText="Tak"
              okButtonProps={{ loading: status === "loading" }}
              cancelText="Nie"
              onConfirm={() =>
                publishMutateAsync({ eventId: data.eventId.toString() })
              }
            >
              <Button type="dashed">
                {!data.isPublished ? "Opublikuj" : "Ukryj"}
              </Button>
            </Popconfirm>
            {error && message.error("Coś poszło nie tak")}
          </>
        }
      />
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          open
          footer={null}
          onCancel={closeModal}
          width={900}
        >
          <EditEventForm onSubmit={closeModal} eventData={data} />
        </Modal>
      )}
    </Conatiner>
  );
};

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
