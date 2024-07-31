import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import React from "react";
import {
  RpgSystemDetailsResponseSchema,
} from "../../api/ResponseSchema/responseSchemas";
import Badge from "antd/es/badge";
import styled from "styled-components";
import Button from "antd/es/button";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import Popconfirm from "antd/es/popconfirm";
import message from "antd/es/message";
import { usePublishRpgSystem } from "../../api/rpgSystems";
import { EditRpgSystemForm } from "./EditRpgSystem";

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
      key: "2",
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
      key: "5",
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
      key: "6",
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
      key: "7",
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
      publishMutateAsync({ rpgSystemId: data.rpgSystemId.toString() });
      message.success("System zaktualizowany");
    } catch (error) {
      message.error("Coś poszło nie tak");
    }
  };

  return (
    <Conatiner>
      <Descriptions
        title="System RPG"
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
          <EditRpgSystemForm onSubmit={closeModal} rpgSystemData={data} />
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
