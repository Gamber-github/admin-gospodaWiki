import { DescriptionsProps } from "antd/es/descriptions";
import { Descriptions } from "../UI/Descriptions/Descriptions";
import React from "react";
import { CharacterDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import Badge from "antd/es/badge";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import message from "antd/es/message";
import { usePublishCharacter } from "../../api/characters";
import { EditCharacterForm } from "../Form/Character/EditCharacterForm";
import { DetailsConatiner } from "../UI/CustomStyles/CustomStyles";
import { DetailsPanel } from "../DetailsPanel/DetailsPanel";

export const CharacterDetails: React.FC<{
  data: CharacterDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const { mutateAsync: publishMutateAsync, status } = usePublishCharacter();

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Imię",
      children: <p>{data.firstName}</p>,
    },
    {
      key: "2",
      label: "Nazwisko",
      children: <p>{data.lastName}</p>,
    },
    {
      key: "3",
      label: "Wiek",
      children: <p>{data.age ? data.age : ""}</p>,
    },
    {
      key: "4",
      label: "Opublikowany",
      children: (
        <Badge
          status={data.isPublished ? "success" : "processing"}
          text={data.isPublished ? "Tak" : "Nie"}
        />
      ),
    },
    {
      key: "5",
      label: "Występuje w serii",
      children: <p>{data.series ? data.series.name : ""}</p>,
    },
    {
      key: "6",
      label: "System RPG",
      children: <p>{data.rpgSystem.name}</p>,
    },
    {
      key: "7",
      label: "Posiadane przedmioty",
      children: (
        <>
          {data.items.map((item, key) => (
            <p key={key}>{item.name}</p>
          ))}
        </>
      ),
    },
    {
      key: "8",
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
      key: "",
      label: "Opis",
      children: <p>{data.description}</p>,
    },
  ];

  const publish = () => {
    try {
      publishMutateAsync({ characterId: data.characterId.toString() });
      message.success("Gracz zaktualizowany");
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
          <EditCharacterForm onSubmit={closeModal} characterData={data} />
        </Modal>
      )}
    </DetailsConatiner>
  );
};
