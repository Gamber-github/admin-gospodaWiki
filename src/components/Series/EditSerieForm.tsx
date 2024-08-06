import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Title from "antd/es/typography/Title";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { CustomSelection } from "../UI/Select/CustomSelection";
import { useEditSerie } from "../../api/series";
import { SerieDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import { useGetRpgSystems } from "../../api/rpgSystems";
import { useGetPlayers } from "../../api/players";
import { useGetTags } from "../../api/tags";
import { useGetCharacters } from "../../api/characters";

export const editSerieSchema = z.object({
  name: z.string(),
  description: z.string(),
  youtubePlaylistId: z.string(),
  tagsId: z.array(z.number()),
  playersId: z.array(z.number()),
  charactersId: z.array(z.number()),
  rpgSystemId: z.number(),
  gameMasterId: z.number(),
});

type EditSerieSchemaType = z.infer<typeof editSerieSchema>;

export const EditSerieForm: React.FC<{
  onSubmit: () => void;
  serieData: SerieDetailsResponseSchema;
}> = ({ onSubmit, serieData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditSerieSchemaType>({
    resolver: zodResolver(editSerieSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: serieData.name,
      description: serieData.description,
      youtubePlaylistId: serieData.youtubePlaylistId,
      tagsId: serieData.tags?.map((tag) => tag.tagId) ?? [],
      playersId: serieData.players?.map((player) => player.playerId) ?? [],
      charactersId: serieData.characters?.map(
        (character) => character.characterId
      ),
      rpgSystemId: serieData.rpgSystem?.rpgSystemId,
      gameMasterId: serieData.gameMaster?.playerId,
    },
  });

  const { mutateAsync: EditMutataion } = useEditSerie(
    serieData.seriesId.toString()
  );

  const {
    data: rpgSystemData,
    status: rpgSystemStatus,
    error: rpgSystemError,
  } = useGetRpgSystems();

  const {
    data: playerData,
    status: playerStatus,
    error: playerError,
  } = useGetPlayers();

  const {
    data: characterData,
    status: characterStatus,
    error: characterError,
  } = useGetCharacters();

  const { data: tagsData, status: tagsStatus, error: tagsError } = useGetTags();

  const mappedCharacters =
    characterData?.items.map((character) => ({
      valueId: character.characterId,
      name: character.fullName,
    })) ?? [];

  const mappedTags =
    tagsData?.items.map((tag) => ({
      valueId: tag.tagId,
      name: tag.name,
    })) ?? [];

  const mappedRpgSystem =
    rpgSystemData?.items.map((system) => ({
      valueId: system.rpgSystemId,
      name: system.name,
    })) ?? [];

  const mappedPlayers =
    playerData?.items.map((player) => ({
      valueId: player.playerId,
      name: player.firstName + " " + player.lastName,
    })) ?? [];

  const submit = async (payload: EditSerieSchemaType) => {
    try {
      await EditMutataion(payload);
      message.success("Rekord pomyślnie zaktualizowany");
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się zaktualizować rekordu. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }} level={2}>
        Edytuj Serię {serieData.name}
      </Title>
      <Form.Item
        name="name"
        label="Nazwa"
        help={errors.name?.message as string}
        validateStatus={errors.name ? "error" : ""}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        name="youtubePlaylistId"
        label="Playlista YouTube"
        help={errors.youtubePlaylistId?.message as string}
        validateStatus={errors.youtubePlaylistId ? "error" : ""}
      >
        <Controller
          name="youtubePlaylistId"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        name="rpgSystemId"
        label="Powiązany system RPG"
        help={errors.rpgSystemId?.message as string}
        validateStatus={errors.rpgSystemId ? "error" : ""}
      >
        <Controller
          name="rpgSystemId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              singleSelection
              selectionData={{ data: mappedRpgSystem }}
              error={rpgSystemError}
              status={rpgSystemStatus}
              {...field}
              data={
                serieData.rpgSystem && {
                  valueId: serieData.rpgSystem.rpgSystemId,
                  name: serieData.rpgSystem.name,
                }
              }
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="gameMasterId"
        label="Wybierz Mistrza Gry"
        help={errors.gameMasterId?.message as string}
        validateStatus={errors.gameMasterId ? "error" : ""}
      >
        <Controller
          name="gameMasterId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              singleSelection
              selectionData={{ data: mappedPlayers }}
              error={playerError}
              status={playerStatus}
              {...field}
              data={
                serieData.gameMaster && {
                  valueId: serieData.gameMaster.playerId,
                  name:
                    serieData.gameMaster.firstName +
                    " " +
                    serieData.gameMaster.lastName,
                }
              }
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="playersId"
        label="Wybierz graczy"
        help={errors.playersId?.message as string}
        validateStatus={errors.playersId ? "error" : ""}
      >
        <Controller
          name="playersId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedPlayers }}
              error={playerError}
              status={playerStatus}
              {...field}
              data={
                serieData.players &&
                serieData.players.map((item) => ({
                  valueId: item.playerId,
                  name: item.firstName + " " + item.lastName,
                }))
              }
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="charactersId"
        label="Wybierz powiązane postacie"
        help={errors.charactersId?.message as string}
        validateStatus={errors.charactersId ? "error" : ""}
      >
        <Controller
          name="charactersId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedCharacters }}
              error={characterError}
              status={characterStatus}
              {...field}
              data={
                serieData.characters &&
                serieData.characters.map((item) => ({
                  valueId: item.characterId,
                  name: item.firstName + " " + item.lastName,
                }))
              }
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="tagsId"
        label="Wybierz Tagi"
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
              data={
                serieData.tags &&
                serieData.tags.map((item) => ({
                  valueId: item.tagId,
                  name: item.name,
                }))
              }
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="description"
        label="Opis"
        help={errors.description?.message as string}
        validateStatus={errors.description ? "error" : ""}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => <TextArea {...field} rows={6} />}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Wyślij
      </Button>
    </Form>
  );
};
