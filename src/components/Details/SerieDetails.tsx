import { DescriptionsProps } from "antd/es/descriptions";
import { Descriptions } from "../UI/Descriptions/Descriptions";
import React from "react";
import { SerieDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import Badge from "antd/es/badge";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";

import { usePublishSerie } from "../../api/series";
import { EditSerieForm } from "../Form/Serie/EditSerieForm";
import { DetailsConatiner } from "../UI/CustomStyles/CustomStyles";
import { DetailsPanel } from "../DetailsPanel/DetailsPanel";

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
      key: "4",
      label: "Playlist Youtube ID",
      children: <p>{data.youtubePlaylistId ? data.youtubePlaylistId : ""}</p>,
    },
    {
      key: "5",
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
      key: "6",
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
      key: "7",
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
      key: "8",
      label: "Tagi",
      children: (
        <>
          {data.tags &&
            data.tags.map((tag, key) => <p key={key}>{tag.name}</p>)}
        </>
      ),
    },
    {
      key: "9",
      label: "Opis",
      children: <p>{data.description}</p>,
    },
  ];

  const publish = () => {
    publishMutateAsync({ serieId: data.seriesId.toString() });
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
      <Descriptions title="Seria" items={items} />
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
    </DetailsConatiner>
  );
};
