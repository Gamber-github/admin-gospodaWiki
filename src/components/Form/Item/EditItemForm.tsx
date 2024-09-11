import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { ItemDetailsResponseSchema } from "../../../api/ResponseSchema/responseSchemas";
import Title from "antd/es/typography/Title";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { useEditItem } from "../../../api/items";
import { useGetTags } from "../../../api/tags";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";

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
      <ControlledInput
        name="name"
        label="Nazwa"
        control={control}
        errors={errors}
        defaultValue={itemData.name}
      />
      <ControlledInput
        name="ownerName"
        label="Właściciel"
        control={control}
        errors={errors}
        defaultValue={itemData.ownerName}
      />
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
      <ControlledTextArea
        name="description"
        label="Opis"
        control={control}
        errors={errors}
        defaultValue={itemData.description}
      />
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Wyślij
      </Button>
    </Form>
  );
};
