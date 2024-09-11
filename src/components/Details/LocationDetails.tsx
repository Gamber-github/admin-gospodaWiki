import { DescriptionsProps } from "antd/es/descriptions";
import React from "react";

import Badge from "antd/es/badge";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";

import message from "antd/es/message";

import { Descriptions } from "../UI/Descriptions/Descriptions";
import { DetailsConatiner } from "../UI/CustomStyles/CustomStyles";
import { DetailsPanel } from "../DetailsPanel/DetailsPanel";
import { LocationDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import { usePublishLocation } from "../../api/locations";
import { EditLocationForm } from "../Form/Location/EditLocationForm";

export const LocationDetails: React.FC<{
  data: LocationDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const { mutateAsync: publishMutateAsync, status } = usePublishLocation();

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
      label: "Adres",
      children: <p>{data.address}</p>,
    },
    {
      key: "4",
      label: "Miasto",
      children: <p>{data.city}</p>,
    },
    {
      key: "5",
      label: "Url lokacji",
      children: <a href={data.locationURL}>{data.locationURL}</a>,
    },
    {
      key: "6",
      label: "Eventy",
      children: (
        <>
          {data.events.map((tag, key) => (
            <p key={key}>{tag.name}</p>
          ))}
        </>
      ),
    },
  ];

  const publish = async () => {
    try {
      await publishMutateAsync({ locationId: data.locationId.toString() });
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
          <EditLocationForm onSubmit={closeModal} locationData={data} />
        </Modal>
      )}
    </DetailsConatiner>
  );
};
