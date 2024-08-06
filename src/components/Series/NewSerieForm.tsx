import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, message } from "antd";
import Title from "antd/es/typography/Title";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import TextArea from "antd/es/input/TextArea";
import { useAddSerie } from "../../api/series";

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
      <Form.Item
        name="name"
        rules={[{ required: true }]}
        help={errors.name?.message as string}
        validateStatus={errors.name ? "error" : ""}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input placeholder="Nazwa serii" {...field} />}
        />
      </Form.Item>
      <Form.Item
        name="youtubePlaylistId"
        rules={[{ required: true, message: "Podaj ID playlisty na Youtube" }]}
        help={errors.youtubePlaylistId?.message as string}
        validateStatus={errors.youtubePlaylistId ? "error" : ""}
      >
        <Controller
          name="youtubePlaylistId"
          control={control}
          render={({ field }) => (
            <Input placeholder="Podaj ID listy na Youtube" {...field} />
          )}
        />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Podaj opis serii" }]}
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
