import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import React from "react";
import { SerieDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import Badge from "antd/es/badge";
import styled from "styled-components";
import Button from "antd/es/button";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import Popconfirm from "antd/es/popconfirm";
import message from "antd/es/message";
import { usePublishSerie } from "../../api/series";
import { EditSerieForm } from "./EditSerieForm";

export const SerieDetails: React.FC<{
  data: SerieDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const { mutateAsync: publishMutateAsync, error, status } = usePublishSerie();

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
      label: "System RPG",
      children: <p>{data.rpgSystem ? data.rpgSystem.name : ""}</p>,
    },
    {
      key: "9",
      label: "Playlist Youtube ID",
      children: <p>{data.youtubePlaylistId ? data.youtubePlaylistId : ""}</p>,
    },
    {
      key: "8",
      label: "Mistrz Gry",
      children: (
        <p>
          {data.gameMaster
            ? data.gameMaster.firstName + " " + data.gameMaster.lastName
            : ""}
        </p>
      ),
    },
    {
      key: "4",
      label: "Powiązani gracze",
      children: (
        <>
          {data.players &&
            data.players.map((player) => (
              <p key={player.playerId}>
                {player.firstName + " " + player.lastName}
              </p>
            ))}
        </>
      ),
    },
    {
      key: "5",
      label: "Powiązane postacie",
      children: (
        <>
          {data.characters &&
            data.characters.map((character) => (
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
          {data.tags &&
            data.tags.map((tag, key) => <p key={key}>{tag.name}</p>)}
        </>
      ),
    },
    {
      key: "7",
      label: "Opis",
      children: <p>{data.description}</p>,
    },
  ];

  const publish = () => {
    try {
      publishMutateAsync({ serieId: data.seriesId.toString() });
      message.success("System zaktualizowany");
    } catch (error) {
      message.error("Coś poszło nie tak");
    }
  };

  return (
    <Conatiner>
      <Descriptions
        title="Seria"
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
          <EditSerieForm onSubmit={closeModal} serieData={data} />
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
