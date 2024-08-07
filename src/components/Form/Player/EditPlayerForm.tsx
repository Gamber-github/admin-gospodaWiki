import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, InputNumber, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useEditPlayer } from "../../../api/players";
import { PlayerDetailsResponseSchema } from "../../../api/ResponseSchema/responseSchemas";
import Title from "antd/es/typography/Title";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { useGetSeries } from "../../../api/series";

export const EditPlayerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  about: z.string(),
  seriesId: z.array(z.number()),
});

type EditPlayerSchemaType = z.infer<typeof EditPlayerSchema>;

export const EditPlayerForm: React.FC<{
  onSubmit: () => void;
  playerData: PlayerDetailsResponseSchema;
}> = ({ onSubmit, playerData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPlayerSchemaType>({
    resolver: zodResolver(EditPlayerSchema),
    reValidateMode: "onSubmit",
    defaultValues: {
      firstName: playerData.firstName,
      lastName: playerData.lastName,
      age: playerData.age,
      about: playerData.about,
      seriesId: playerData.series.map((serie) => serie.seriesId),
    },
  });

  const { mutateAsync: EditPlayer } = useEditPlayer(
    playerData.playerId.toString()
  );

  const {
    data: seriesData,
    status: seriesStatus,
    error: seriesError,
  } = useGetSeries();

  const mappedSeries =
    seriesData?.items.map((serie) => ({
      valueId: serie.seriesId,
      name: serie.name,
    })) ?? [];

  const submit = async (payload: EditPlayerSchemaType) => {
    try {
      await EditPlayer(payload);
      message.success("Gracz pomyślnie zaktualizowany");
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się zaktualizować gracza. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }} level={2}>
        Edytuj gracza {playerData.firstName} {playerData.lastName}
      </Title>
      <Form.Item
        name="firstName"
        label="Imię"
        help={errors.firstName?.message as string}
        validateStatus={errors.firstName ? "error" : ""}
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        label="Nazwisko"
        help={errors.lastName?.message as string}
        validateStatus={errors.lastName ? "error" : ""}
      >
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item
        name="age"
        label="Wiek"
        help={errors.age?.message as string}
        validateStatus={errors.age ? "error" : ""}
      >
        <Controller
          name="age"
          control={control}
          render={({ field }) => <InputNumber {...field} />}
        />
      </Form.Item>
      <Form.Item
        name="seriesId"
        label="Występuje w seriach"
        help={errors.seriesId?.message as string}
        validateStatus={errors.seriesId ? "error" : ""}
      >
        <Controller
          name="seriesId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              selectionData={{ data: mappedSeries }}
              error={seriesError}
              status={seriesStatus}
              {...field}
              data={playerData.series.map((item) => ({
                valueId: item.seriesId,
                name: item.name,
              }))}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="about"
        label="O mnie"
        help={errors.about?.message as string}
        validateStatus={errors.about ? "error" : ""}
      >
        <Controller
          name="about"
          control={control}
          render={({ field }) => <TextArea {...field} rows={6} />}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Wyślij
      </Button>
    </Form>
  );
};
