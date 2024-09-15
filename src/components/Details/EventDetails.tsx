import { DescriptionsProps } from "antd/es/descriptions";
import React from "react";

import Badge from "antd/es/badge";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";

import message from "antd/es/message";
import { EventDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import { usePublishEvent } from "../../api/events";
import { EditEventForm } from "../Form/Event/EditEventForm";
import { Descriptions } from "../UI/Descriptions/Descriptions";
import { DetailsConatiner } from "../UI/CustomStyles/CustomStyles";
import { DetailsPanel } from "../DetailsPanel/DetailsPanel";

export const EventDetails: React.FC<{
  data: EventDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const { mutateAsync: publishMutateAsync, status } = usePublishEvent();

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

  const publish = async () => {
    try {
      await publishMutateAsync({ eventId: data.eventId.toString() });
      message.success("Zaktualizowano status publikacji");
    } catch (error) {
      message.error("Wystąpił błąd podczas publikacji");
    }
  };

  return (
    <DetailsConatiner>
      <DetailsPanel
        isPublished={data.isPublished}
        publish={publish}
        showModal={showModal}
        status={status}
      />
      <Descriptions items={items} title="Szczegóły wydarzenia" />
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
    </DetailsConatiner>
  );
};
