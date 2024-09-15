import { DescriptionsProps } from "antd/es/descriptions";
import { Descriptions } from "../UI/Descriptions/Descriptions";
import React from "react";
import { AdventureDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import Badge from "antd/es/badge";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import message from "antd/es/message";
import { DetailsConatiner } from "../UI/CustomStyles/CustomStyles";
import { DetailsPanel } from "../DetailsPanel/DetailsPanel";
import { usePublishAdventure } from "../../api/adventure";
import { EditAdventureForm } from "../Form/Adventure/EditAdventureForm";

export const AdventureDetails: React.FC<{
  data: AdventureDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const { mutateAsync: publishMutateAsync, status } = usePublishAdventure();

  const items: DescriptionsProps["items"] = [
    {
      key: "Title",
      label: "Tytuł",
      children: <p>{data.title}</p>,
    },
    {
      key: "Published",
      label: "Opublikowany",
      children: (
        <Badge
          status={data.isPublished ? "success" : "processing"}
          text={data.isPublished ? "Tak" : "Nie"}
        />
      ),
    },
    {
      key: "Characters",
      label: "Postacie w przygodzie",
      children: (
        <>
          {data.characters?.map((character, key) => (
            <p key={key}>{character.firstName + " " + character.lastName}</p>
          ))}
        </>
      ),
    },
    {
      key: "SystemRpg",
      label: "System RPG",
      children: <p>{data.rpgSystem?.name}</p>,
    },
    {
      key: "Series",
      label: "Seria przygód",
      children: <p>{data.series?.name}</p>,
    },
    {
      key: "Tagi",
      label: "Tagi",
      children: (
        <>
          {data.tags?.map((tag, key) => (
            <p key={key}>{tag.name}</p>
          ))}
        </>
      ),
    },
    {
      key: "Opis",
      label: "Opis",
      children: <p>{data.description}</p>,
    },
  ];

  const publish = () => {
    try {
      publishMutateAsync({ adventureId: data.adventureId.toString() });
      message.success("Rekord zaktualizowany");
    } catch (error) {
      message.error("Coś poszło nie tak");
    }
  };

  return (
    <DetailsConatiner>
      <DetailsPanel
        publish={publish}
        status={status}
        isPublished={data.isPublished}
        showModal={showModal}
      />
      <Descriptions title="Dane postaci" items={items} />
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          open
          footer={null}
          onCancel={closeModal}
          width={900}
        >
          <EditAdventureForm onSubmit={closeModal} adventureData={data} />
        </Modal>
      )}
    </DetailsConatiner>
  );
};
