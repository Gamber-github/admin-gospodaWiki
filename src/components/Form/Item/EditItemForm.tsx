import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ItemDetailsResponseSchema } from "../../../api/ResponseSchema/responseSchemas";
import Title from "antd/es/typography/Title";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { useEditItem } from "../../../api/items";
import { useGetTags } from "../../../api/tags";

export const EditItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  ownerName: z.string(),
  tagIds: z.array(z.number()),
});

type EditItemSchemaType = z.infer<typeof EditItemSchema>;

export const EditItemForm: React.FC<{
  onSubmit: () => void;
  itemData: ItemDetailsResponseSchema;
}> = ({ onSubmit, itemData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditItemSchemaType>({
    resolver: zodResolver(EditItemSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      name: itemData.name,
      description: itemData.description,
      tagIds: itemData.tags.map((tag) => tag.tagId),
      ownerName: itemData.ownerName,
    },
  });

  const { mutateAsync: EditRecord, isLoading } = useEditItem(
    itemData.itemId.toString()
  );

  const {
    data: tagData,
    status: tagStatus,
    error: tagError,
  } = useGetTags({
    pageSize: 100,
  });

  const mappedSeries =
    tagData?.items.map((tag) => ({
      valueId: tag.tagId,
      name: tag.name,
    })) ?? [];

  const submit = async (payload: EditItemSchemaType) => {
    try {
      await EditRecord(payload);
      message.success("Rekord pomyślnie zaktualizowany");
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się zaktualizować rekordu. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }} level={2}>
        Edytuj przedmiot: {itemData.name}
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
        name="ownerName"
        label="Właściciel"
        help={errors.ownerName?.message as string}
        validateStatus={errors.ownerName ? "error" : ""}
      >
        <Controller
          name="ownerName"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        name="tagIds"
        label="Tagi"
        help={errors.tagIds?.message as string}
        validateStatus={errors.tagIds ? "error" : ""}
      >
        <Controller
          name="tagIds"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedSeries }}
              error={tagError}
              status={tagStatus}
              {...field}
              data={itemData.tags.map((item) => ({
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
        label="Opis przedmiotu"
        help={errors.description?.message as string}
        validateStatus={errors.description ? "error" : ""}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => <TextArea {...field} rows={6} />}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Wyślij
      </Button>
    </Form>
  );
};
