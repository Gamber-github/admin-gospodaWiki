import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Title from "antd/es/typography/Title";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { CustomSelection } from "../UI/Select/CustomSelection";
import { useEditRpgSystem } from "../../api/rpgSystems";
import { RpgSystemDetailsResponseSchema } from "../../api/ResponseSchema/responseSchemas";
import { useGetTags } from "../../api/tags";

export const editRpgSystemSchema = z.object({
  rpgSystemId: z.number(),
  name: z.string(),
  description: z.string(),
  storyIds: z.array(z.number()),
  tagsIds: z.array(z.number()),
  charactersIds: z.array(z.number()),
  seriesIds: z.array(z.number()),
});

type EditRpgSystemSchemaType = z.infer<typeof editRpgSystemSchema>;

export const EditRpgSystemForm: React.FC<{
  onSubmit: () => void;
  rpgSystemData: RpgSystemDetailsResponseSchema;
}> = ({ onSubmit, rpgSystemData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditRpgSystemSchemaType>({
    resolver: zodResolver(editRpgSystemSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      rpgSystemId: rpgSystemData.rpgSystemId,
      name: rpgSystemData.name,
      description: rpgSystemData.description,
      storyIds: rpgSystemData.stories.map((story) => story.storyId),
      tagsIds: rpgSystemData.tags.map((tag) => tag.tagId),
      charactersIds: rpgSystemData.characters.map(
        (character) => character.characterId
      ),
      seriesIds: rpgSystemData.series.map((serie) => serie.seriesId),
    },
  });

  const { mutateAsync: EditRpgSystem } = useEditRpgSystem(
    rpgSystemData.rpgSystemId.toString()
  );

  const {
    data: tagsData,
    status: tagsStatus,
    error: tagsError,
  } = useGetTags({
    pageSize: 100,
  });

  const mappedTags =
    tagsData?.items.map((tag) => ({
      valueId: tag.tagId,
      name: tag.name,
    })) ?? [];

  const submit = async (payload: EditRpgSystemSchemaType) => {
    try {
      await EditRpgSystem(payload);
      message.success("System pomyślnie zaktualizowany");
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się zaktualizować systemu. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }} level={2}>
        Edytuj system {rpgSystemData.name}
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
              data={rpgSystemData.tags.map((item) => ({
                valueId: item.tagId,
                name: item.name,
              }))}
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
