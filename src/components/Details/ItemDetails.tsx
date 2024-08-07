import Descriptions, { DescriptionsProps } from "antd/es/descriptions";
import React from "react";

import Badge from "antd/es/badge";
import styled from "styled-components";
import Button from "antd/es/button";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";
import Popconfirm from "antd/es/popconfirm";
import message from "antd/es/message";
import { ItemDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import { usePublishItem } from "../../api/items";
import { EditItemForm } from "../Form/Item/EditItemForm";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";

export const ItemDetails: React.FC<{
  data: ItemDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const {
    mutateAsync: publishMutateAsync,
    error,
    status,
    isLoading,
  } = usePublishItem();

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
      label: "Właściciel",
      children: <p>{data.ownerName ? data.ownerName : ""}</p>,
    },
    {
      key: "3",
      label: "Postacie posiadające przedmiot",
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

  const publish = () => publishMutateAsync({ id: data.itemId.toString() });

  return (
    <Conatiner>
      <Descriptions
        title="Przedmiot fabularny"
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
              cancelText="Nie"
              onConfirm={publish}
            >
              <Button type="dashed" loading={isLoading}>
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
          <EditItemForm onSubmit={closeModal} itemData={data} />
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
