import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddSerie } from "../../../api/series";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";

export const newSerieSchema = z.object({
  name: z.string(),
  description: z.string(),
  youtubePlaylistId: z.string(),
});

type NewSerieSchemaType = z.infer<typeof newSerieSchema>;

export const NewSerieForm: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewSerieSchemaType>({
    resolver: zodResolver(newSerieSchema),
    reValidateMode: "onSubmit",
  });

  const { mutateAsync: AddMutation } = useAddSerie();

  const submit = (payload: NewSerieSchemaType) => {
    try {
      AddMutation(payload);
      onSubmit();
      message.success("Seria pomyślnie dodana");
    } catch (error) {
      message.error(`Nie udało się dodać serii. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }}>Dodaj nową serię</Title>
      <ControlledInput
        name="name"
        label="Nazwa"
        control={control}
        errors={errors}
      />
      <ControlledInput
        name="youtubePlaylistId"
        label="Id playlisty youtube"
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
