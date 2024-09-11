import { DescriptionsProps } from "antd/es/descriptions";
import { Descriptions } from "../UI/Descriptions/Descriptions";
import React from "react";
import { RpgSystemDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import Badge from "antd/es/badge";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import message from "antd/es/message";
import { usePublishRpgSystem } from "../../api/rpgSystems";
import { EditRpgSystemForm } from "../Form/RpgSystem/EditRpgSystem";
import { DetailsPanel } from "../DetailsPanel/DetailsPanel";
import { DetailsConatiner } from "../UI/CustomStyles/CustomStyles";

export const RpgSystemDetails: React.FC<{
  data: RpgSystemDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const {
    mutateAsync: publishMutateAsync,
    error,
    status,
  } = usePublishRpgSystem();

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
      label: "Powiązane historie",
      children: (
        <>
          {data.stories.map((story) => (
            <p key={story.storyId}>{story.name}</p>
          ))}
        </>
      ),
    },
    {
      key: "4",
      label: "Powiązane serie",
      children: (
        <>
          {data.series.map((serie) => (
            <p key={serie.seriesId}>{serie.name}</p>
          ))}
        </>
      ),
    },
    {
      key: "5",
      label: "Powiązane postacie",
      children: (
        <>
          {data.characters.map((character) => (
            <p key={character.characterId}>
              {character.firstName + " " + character.lastName}
            </p>
          ))}
        </>
      ),
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
      await publishMutateAsync({ rpgSystemId: data.rpgSystemId.toString() });
    } catch (error) {
      message.error("Coś poszło nie tak");
    }
  };

  return (
    <DetailsConatiner>
      <DetailsPanel
        error={error}
        isPublished={data.isPublished}
        publish={publish}
        showModal={showModal}
        status={status}
      />
      <Descriptions title="System RPG" items={items} />

      {isModalOpen && (
        <Modal
          onClose={closeModal}
          open
          footer={null}
          onCancel={closeModal}
          width={900}
        >
          <EditRpgSystemForm onSubmit={closeModal} rpgSystemData={data} />
        </Modal>
      )}
    </DetailsConatiner>
  );
};
