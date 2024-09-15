import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useGetSeries } from "../../../api/series";
import { useGetRpgSystems } from "../../../api/rpgSystems";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";
import { useAddAdventure } from "../../../api/adventure";

export const newAdventureSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  seriesId: z.number().optional(),
  rpgSystemId: z.number().optional(),
  storyId: z.number().optional(),
});

type NewAdventureSchemaType = z.infer<typeof newAdventureSchema>;

export const NewAdventureForm: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewAdventureSchemaType>({
    resolver: zodResolver(newAdventureSchema),
    reValidateMode: "onSubmit",
  });

  const { mutateAsync: addAdventure } = useAddAdventure();

  const {
    data: seriesData,
    status: seriesStatus,
    error: seriesError,
  } = useGetSeries();

  const {
    data: rpgSystemsData,
    status: rpgSystemsStatus,
    error: rpgSystemsError,
  } = useGetRpgSystems();

  const mappedSeries =
    seriesData?.items.map((serie) => ({
      valueId: serie.seriesId,
      name: serie.name,
    })) ?? [];

  const mappedRpgSystems =
    rpgSystemsData?.items.map((rpgSystem) => ({
      valueId: rpgSystem.rpgSystemId,
      name: rpgSystem.name,
    })) ?? [];

  const submit = (payload: NewAdventureSchemaType) => {
    try {
      addAdventure(payload);
      onSubmit();
      message.success("Gracz pomyślnie dodany");
    } catch (error) {
      message.error(`Nie udało się dodać gracza. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }}>Dodaj nową przygodę</Title>
      <ControlledInput
        name="title"
        label="Tytuł"
        control={control}
        errors={errors}
      />
      <Form.Item
        name="seriesId"
        label="Występuje w serii"
        help={errors.seriesId?.message as string}
        validateStatus={errors.seriesId ? "error" : ""}
      >
        <Controller
          name="seriesId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              singleSelection
              selectionData={{ data: mappedSeries }}
              error={seriesError}
              status={seriesStatus}
              {...field}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>
      <Form.Item
        name="rpgSystemId"
        label="System RPG"
        help={errors.rpgSystemId?.message as string}
        validateStatus={errors.rpgSystemId ? "error" : ""}
      >
        <Controller
          name="rpgSystemId"
          control={control}
          render={({ field }) => (
            <CustomSelection
              singleSelection
              selectionData={{ data: mappedRpgSystems }}
              error={rpgSystemsError}
              status={rpgSystemsStatus}
              {...field}
              onChange={field.onChange}
            />
          )}
        />
      </Form.Item>

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
