import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import TextArea from "antd/es/input/TextArea";
import { useCreateItem } from "../../../api/items";

export const newItemSchema = z.object({
  name: z.string(),
  description: z.string(),
});

type NewItemSchemaType = z.infer<typeof newItemSchema>;

export const NewItemForm: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewItemSchemaType>({
    resolver: zodResolver(newItemSchema),
    reValidateMode: "onSubmit",
  });

  const { mutateAsync: AddMutation } = useCreateItem();

  const submit = async (payload: NewItemSchemaType) => {
    try {
      await AddMutation(payload);
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się dodać rekordu. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }}>
        Dodaj nowy przedmiot fabularny
      </Title>
      <Form.Item
        name="name"
        rules={[{ required: true }]}
        help={errors.name?.message as string}
        validateStatus={errors.name ? "error" : ""}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input placeholder="Nazwa przedmiotu" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Podaj opis przedmiotu" }]}
        help={errors.description?.message as string}
        validateStatus={errors.description ? "error" : ""}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea placeholder="Podaj Opis" {...field} rows={6} />
          )}
        />
      </Form.Item>

      <Button htmlType="submit" type="primary">
        Dodaj
      </Button>
    </Form>
  );
};
