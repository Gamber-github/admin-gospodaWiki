import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import React from "react";
import { CharacterDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import Badge from "antd/es/badge";
import styled from "styled-components";
import Button from "antd/es/button";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import Popconfirm from "antd/es/popconfirm";
import message from "antd/es/message";
import { usePublishCharacter } from "../../api/characters";
import { EditCharacterForm } from "./EditCharacterForm";

export const CharacterDetails: React.FC<{
  data: CharacterDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const {
    mutateAsync: publishMutateAsync,
    error,
    status,
  } = usePublishCharacter();

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
      children: <p>{data.age}</p>,
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
      children: <p>{data.series.name}</p>,
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
    <Conatiner>
      <Descriptions
        title="Dane postaci"
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
              onConfirm={publish}
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
          <EditCharacterForm onSubmit={closeModal} characterData={data} />
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
