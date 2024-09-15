import { DescriptionsProps } from "antd/es/descriptions";
import React from "react";

import Badge from "antd/es/badge";
import Modal from "antd/es/modal";

import { useModalProps } from "../../hooks/useModalProps";

import { ItemDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import { usePublishItem } from "../../api/items";
import { EditItemForm } from "../Form/Item/EditItemForm";
import { Descriptions } from "../UI/Descriptions/Descriptions";
import { DetailsPanel } from "../DetailsPanel/DetailsPanel";
import { DetailsConatiner } from "../UI/CustomStyles/CustomStyles";

export const ItemDetails: React.FC<{
  data: ItemDetailsResponseSchema;
}> = ({ data }) => {
  const { showModal, closeModal, isModalOpen } = useModalProps();

  const { mutateAsync: publishMutateAsync, status } = usePublishItem();

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
    <DetailsConatiner>
      <DetailsPanel
        isPublished={data.isPublished}
        publish={publish}
        showModal={showModal}
        status={status}
      />
      <Descriptions title="Przedmiot fabularny" items={items} />
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
    </DetailsConatiner>
  );
};
