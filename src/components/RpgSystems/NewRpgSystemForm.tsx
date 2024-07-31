import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useAddRpgSystem } from "../../api/rpgSystems";
import TextArea from "antd/es/input/TextArea";

export const newRpgSystemSchema = z.object({
  name: z.string(),
  description: z.string(),
});

type NewRpgSystemSchemaType = z.infer<typeof newRpgSystemSchema>;

export const NewRpgSystemForm: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewRpgSystemSchemaType>({
    resolver: zodResolver(newRpgSystemSchema),
    reValidateMode: "onSubmit",
  });

  const { mutateAsync: AddRpgSystem } = useAddRpgSystem();

  const submit = (payload: NewRpgSystemSchemaType) => {
    try {
      AddRpgSystem(payload);
      onSubmit();
      message.success("System pomyślnie dodany");
    } catch (error) {
      message.error(`Nie udało się dodać gsystemu. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }}>Dodaj nowy system RPG</Title>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Podaj nazwę systemu RPG" }]}
        help={errors.name?.message as string}
        validateStatus={errors.name ? "error" : ""}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input placeholder="Nazwa systemu" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Podaj opis systemu" }]}
        help={errors.description?.message as string}
        validateStatus={errors.description ? "error" : ""}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea placeholder="Opis Systemu" {...field} rows={6} />
          )}
        />
      </Form.Item>

      <Button htmlType="submit" type="primary">
        Dodaj
      </Button>
    </Form>
  );
};
