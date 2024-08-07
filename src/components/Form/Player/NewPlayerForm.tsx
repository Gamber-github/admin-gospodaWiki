import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useAddPlayer } from "../../../api/players";

export const newPlayersSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

type NewPlayerSchemaType = z.infer<typeof newPlayersSchema>;

export const NewPlayerForm: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPlayerSchemaType>({
    resolver: zodResolver(newPlayersSchema),
    reValidateMode: "onSubmit",
  });

  const { mutateAsync: AddPlayer } = useAddPlayer();

  const submit = (payload: NewPlayerSchemaType) => {
    try {
      AddPlayer(payload);
      onSubmit();
      message.success("Gracz pomyślnie dodany");
    } catch (error) {
      message.error(`Nie udało się dodać gracza. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }}>Dodaj nowego gracza</Title>
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Podaj imię gracza" }]}
        help={errors.firstName?.message as string}
        validateStatus={errors.firstName ? "error" : ""}
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <Input placeholder="Imię" {...field} />}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Podaj nazwisko gracza" }]}
        help={errors.firstName?.message as string}
        validateStatus={errors.firstName ? "error" : ""}
      >
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <Input placeholder="Nazwisko" {...field} />}
        />
      </Form.Item>

      <Button htmlType="submit" type="primary">
        Dodaj
      </Button>
    </Form>
  );
};
