import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Title from "antd/es/typography/Title";
import { CharacterDetailsResponseSchema } from "../../../api/ResponseSchema/responseSchemas";
import { useEditCharacter } from "../../../api/characters";
import { useGetSeries } from "../../../api/series";
import { useGetRpgSystems } from "../../../api/rpgSystems";
import { useGetItems } from "../../../api/items";
import { useGetTags } from "../../../api/tags";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";
import { ControlledNumberInput } from "../../UI/Input/ControlledNumberInput";

export const editCharacterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  description: z.string(),
  seriesId: z.number(),
  rpgSystemId: z.number(),
  tagsId: z.array(z.number()),
  itemsId: z.array(z.number()),
});

type EditCharacterSchemaType = z.infer<typeof editCharacterSchema>;

export const EditCharacterForm: React.FC<{
  onSubmit: () => void;
  characterData: CharacterDetailsResponseSchema;
}> = ({ onSubmit, characterData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCharacterSchemaType>({
    resolver: zodResolver(editCharacterSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      firstName: characterData.firstName,
      lastName: characterData.lastName,
      age: characterData.age,
      description: characterData.description,
      seriesId: characterData.series?.seriesId ?? 0,
      rpgSystemId: characterData.rpgSystem.rpgSystemId,
      tagsId: characterData.tags.map((tag) => tag.tagId),
      itemsId: characterData.items.map((item) => item.itemId),
    },
  });

  const { mutateAsync: Editcharacter } = useEditCharacter(
    characterData.characterId.toString()
  );

  const {
    data: seriesData,
    status: seriesStatus,
    error: seriesError,
  } = useGetSeries();

  const {
    data: rpgSystemsData,
    status: rpgSystemsStatus,
    error: rpgSystemsError,
  } = useGetRpgSystems();

  const {
    data: itemsData,
    status: itemsStatus,
    error: itemsError,
  } = useGetItems();

  const {
    data: tagsData,
    status: tagsStatus,
    error: tagsError,
  } = useGetTags({
    pageSize: 100,
  });

  const mappedSeries =
    seriesData?.items.map((serie) => ({
      valueId: serie.seriesId,
      name: serie.name,
    })) ?? [];

  const mappedRpgSystems =
    rpgSystemsData?.items.map((rpgSystem) => ({
      valueId: rpgSystem.rpgSystemId,
      name: rpgSystem.name,
    })) ?? [];

  const mappedItems =
    itemsData?.items.map((item) => ({
      valueId: item.itemId,
      name: item.name,
    })) ?? [];

  const mappedTags =
    tagsData?.items.map((tag) => ({
      valueId: tag.tagId,
      name: tag.name,
    })) ?? [];

  const submit = async (payload: EditCharacterSchemaType) => {
    try {
      await Editcharacter(payload);
      message.success("Gracz pomyślnie zaktualizowany");
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się zaktualizować gracza. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }} level={2}>
        Edytuj postać {characterData.firstName} {characterData.lastName}
      </Title>
      <ControlledInput
        name="firstName"
        label="Imię"
        control={control}
        errors={errors}
        defaultValue={characterData.firstName}
      />
      <ControlledInput
        name="lastName"
        label="Nazwisko"
        control={control}
        errors={errors}
        defaultValue={characterData.lastName}
      />
      <ControlledNumberInput
        name="age"
        label="Wiek"
        control={control}
        errors={errors}
        defaultValue={characterData.age}
      />
      <Form.Item
        name="seriesId"
        label="Występuje w serii"
        help={errors.seriesId?.message as string}
        validateStatus={errors.seriesId ? "error" : ""}
      >
        <Controller
          name="seriesId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              singleSelection
              selectionData={{ data: mappedSeries }}
              error={seriesError}
              status={seriesStatus}
              {...field}
              data={[
                {
                  valueId: characterData.series?.seriesId ?? 0,
                  name: characterData.series?.name ?? "",
                },
              ]}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="rpgSystemId"
        label="System RPG"
        help={errors.rpgSystemId?.message as string}
        validateStatus={errors.rpgSystemId ? "error" : ""}
      >
        <Controller
          name="rpgSystemId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              singleSelection
              selectionData={{ data: mappedRpgSystems }}
              error={rpgSystemsError}
              status={rpgSystemsStatus}
              {...field}
              data={[
                {
                  valueId: characterData.rpgSystem.rpgSystemId ?? 0,
                  name: characterData.rpgSystem.name ?? "",
                },
              ]}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="itemsId"
        label="Przedmioty fabularne"
        help={errors.itemsId?.message as string}
        validateStatus={errors.itemsId ? "error" : ""}
      >
        <Controller
          name="itemsId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedItems }}
              error={itemsError}
              status={itemsStatus}
              {...field}
              data={characterData.items.map((item) => ({
                valueId: item.itemId,
                name: item.name,
              }))}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="tagsId"
        label="Tagi"
        help={errors.tagsId?.message as string}
        validateStatus={errors.tagsId ? "error" : ""}
      >
        <Controller
          name="tagsId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedTags }}
              error={tagsError}
              status={tagsStatus}
              {...field}
              data={characterData.tags.map((item) => ({
                valueId: item.tagId,
                name: item.name,
              }))}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <ControlledTextArea
        name="description"
        label="Opis"
        control={control}
        errors={errors}
        defaultValue={characterData.description}
      />
      <Button type="primary" htmlType="submit">
        Wyślij
      </Button>
    </Form>
  );
};
