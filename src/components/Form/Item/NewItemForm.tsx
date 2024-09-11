import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateItem } from "../../../api/items";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";

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
      <ControlledInput
        name="name"
        label="Nazwa"
        control={control}
        errors={errors}
      />
      <ControlledTextArea
        name="description"
        label="Opis"
        control={control}
        errors={errors}
      />
      <Button htmlType="submit" type="primary">
        Dodaj
      </Button>
    </Form>
  );
};
