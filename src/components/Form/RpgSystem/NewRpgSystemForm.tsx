import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddRpgSystem } from "../../../api/rpgSystems";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";
import { ControlledInput } from "../../UI/Input/ControlledInput";

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
      <ControlledInput
        name="name"
        label="Imię"
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
