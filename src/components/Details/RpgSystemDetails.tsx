import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import React from "react";
import { RpgSystemDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import Badge from "antd/es/badge";
import styled from "styled-components";
import Button from "antd/es/button";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import Popconfirm from "antd/es/popconfirm";
import message from "antd/es/message";
import { usePublishRpgSystem } from "../../api/rpgSystems";
import { EditRpgSystemForm } from "../Form/RpgSystem/EditRpgSystem";

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
              onConfirm={() =>
                publishMutateAsync({ rpgSystemId: data.rpgSystemId.toString() })
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
