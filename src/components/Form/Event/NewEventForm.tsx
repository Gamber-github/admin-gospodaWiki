import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddEvent } from "../../../api/events";
import { ControlledDatePicker } from "../../UI/DatePicker/ControlledDatePicker";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";

export const newEventSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  eventUrl: z.string().optional(),
  imagePath: z.string().optional(),
  date: z.string().optional(),
});

type NewEventSchemaType = z.infer<typeof newEventSchema>;

export const NewEventForm: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewEventSchemaType>({
    resolver: zodResolver(newEventSchema),
    reValidateMode: "onSubmit",
  });

  const { mutateAsync: AddMutation } = useAddEvent();

  const submit = async (payload: NewEventSchemaType) => {
    try {
      await AddMutation(payload);
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się dodać rekordu. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }}>Dodaj nowy event</Title>
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
      <ControlledInput
        name="eventUrl"
        label="Url Eventu"
        control={control}
        errors={errors}
      />
      <ControlledDatePicker
        control={control}
        name="date"
        label="Data Eventu"
        errors={errors}
      />
      <Button htmlType="submit" type="primary">
        Dodaj
      </Button>
    </Form>
  );
};
