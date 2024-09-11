import { DescriptionsProps } from "antd/es/descriptions";
import React from "react";
import { PlayerDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import Badge from "antd/es/badge";
import styled from "styled-components";
import Button from "antd/es/button";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import Popconfirm from "antd/es/popconfirm";
import { usePublishPlayer } from "../../api/players";
import message from "antd/es/message";
import { EditPlayerForm } from "../Form/Player/EditPlayerForm";
import { Descriptions } from "../UI/Descriptions/Descriptions";
import { DetailsConatiner } from "../UI/CustomStyles/CustomStyles";
import { DetailsPanel } from "../DetailsPanel/DetailsPanel";

export const PlayerDetails: React.FC<{ data: PlayerDetailsResponseSchema }> = ({
  data,
}) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const { mutateAsync, error, status } = usePublishPlayer();

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
      label: "Serie",
      children: (
        <>
          {data.series.map((serie, key) => (
            <p key={key}>{serie.name}</p>
          ))}
        </>
      ),
    },
    {
      key: "6",
      label: "O mnie",
      children: <p>{data.about}</p>,
    },
  ];

  const publish = () => {
    try {
      mutateAsync({ playerId: data.playerId.toString() });
      message.success("Gracz zaktualizowany");
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
      <Descriptions title="Dane gracza" items={items} />
      {isModalOpen && (
        <Modal
          onClose={closeModal}
          open
          footer={null}
          onCancel={closeModal}
          width={900}
        >
          <EditPlayerForm onSubmit={closeModal} playerData={data} />
        </Modal>
      )}
    </DetailsConatiner>
  );
};
