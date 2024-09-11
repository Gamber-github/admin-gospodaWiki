import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useEditPlayer } from "../../../api/players";
import { PlayerDetailsResponseSchema } from "../../../api/ResponseSchema/responseSchemas";
import Title from "antd/es/typography/Title";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { useGetSeries } from "../../../api/series";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledNumberInput } from "../../UI/Input/ControlledNumberInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";

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
      <ControlledInput
        name="firstName"
        label="Imię"
        control={control}
        errors={errors}
        defaultValue={playerData.firstName}
      />
      <ControlledInput
        name="lastName"
        label="Imię"
        control={control}
        errors={errors}
        defaultValue={playerData.lastName}
      />
      <ControlledNumberInput
        name="age"
        label="Wiek"
        control={control}
        errors={errors}
        defaultValue={playerData.age}
      />
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
      <ControlledTextArea
        name="about"
        label="O mnie"
        control={control}
        errors={errors}
        defaultValue={playerData.about}
      />
      <Button type="primary" htmlType="submit">
        Wyślij
      </Button>
    </Form>
  );
};
