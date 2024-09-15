import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Title from "antd/es/typography/Title";
import { AdventureDetailsResponseSchema } from "../../../api/ResponseSchema/responseSchemas";
import { useGetSeries } from "../../../api/series";
import { useGetRpgSystems } from "../../../api/rpgSystems";
import { useGetTags } from "../../../api/tags";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";
import { useEditAdventure } from "../../../api/adventure";
import { useGetCharacters } from "../../../api/characters";

export const editAdventureSchema = z.object({
  title: z.string(),
  description: z.string(),
  rpgSystemId: z.number(),
  seriesId: z.number(),
  tagsIds: z.array(z.number()),
  charactersIds: z.array(z.number()),
});

type EditAdventureSchemaType = z.infer<typeof editAdventureSchema>;

export const EditAdventureForm: React.FC<{
  onSubmit: () => void;
  adventureData: AdventureDetailsResponseSchema;
}> = ({ onSubmit, adventureData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditAdventureSchemaType>({
    resolver: zodResolver(editAdventureSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      title: adventureData.title,
      description: adventureData.description,
      rpgSystemId: adventureData.rpgSystem?.rpgSystemId,
      seriesId: adventureData.series?.seriesId,
      tagsIds: adventureData.tags?.map((tag) => tag.tagId),
      charactersIds: adventureData.characters?.map(
        (character) => character.characterId
      ),
    },
  });

  const { mutateAsync: editMutation } = useEditAdventure(
    adventureData.adventureId.toString()
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
    data: charactersData,
    status: charactersStatus,
    error: charactersError,
  } = useGetCharacters();

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

  const mappedCharacters =
    charactersData?.items.map((character) => ({
      valueId: character.characterId,
      name: character.fullName,
    })) ?? [];

  const mappedTags =
    tagsData?.items.map((tag) => ({
      valueId: tag.tagId,
      name: tag.name,
    })) ?? [];

  const submit = async (payload: EditAdventureSchemaType) => {
    try {
      await editMutation(payload);
      message.success("Gracz pomyślnie zaktualizowany");
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się zaktualizować gracza. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }} level={2}>
        Edytuj wydarzenie: {adventureData.title}
      </Title>
      <ControlledInput
        name="title"
        label="Tytuł"
        control={control}
        errors={errors}
        defaultValue={adventureData.title}
      />
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
              data={
                adventureData.rpgSystem?.rpgSystemId &&
                adventureData.rpgSystem?.name
                  ? {
                      valueId: adventureData.rpgSystem?.rpgSystemId,
                      name: adventureData.rpgSystem?.name,
                    }
                  : undefined
              }
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
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
                  valueId: adventureData.series?.seriesId ?? 0,
                  name: adventureData.series?.name ?? "",
                },
              ]}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="charactersIds"
        label="Postacie"
        help={errors.rpgSystemId?.message as string}
        validateStatus={errors.rpgSystemId ? "error" : ""}
      >
        <Controller
          name="charactersIds"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedCharacters }}
              error={charactersError}
              status={charactersStatus}
              {...field}
              data={
                adventureData.characters?.map((character) => ({
                  valueId: character.characterId,
                  name: character.firstName + " " + character.lastName,
                })) ?? []
              }
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="tagsIds"
        label="Tagi"
        help={errors.tagsIds?.message as string}
        validateStatus={errors.tagsIds ? "error" : ""}
      >
        <Controller
          name="tagsIds"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedTags }}
              error={tagsError}
              status={tagsStatus}
              {...field}
              data={adventureData.tags?.map((item) => ({
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
        defaultValue={adventureData.description}
      />
      <Button type="primary" htmlType="submit">
        Wyślij
      </Button>
    </Form>
  );
};
