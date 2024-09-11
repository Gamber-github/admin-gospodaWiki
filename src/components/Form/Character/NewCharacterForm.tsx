import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useAddCharacter } from "../../../api/characters";
import { useGetSeries } from "../../../api/series";
import { useGetRpgSystems } from "../../../api/rpgSystems";
import { CustomSelection } from "../../UI/Select/CustomSelection";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { ControlledNumberInput } from "../../UI/Input/ControlledNumberInput";
import { ControlledTextArea } from "../../UI/TextArea/ControlledTextArea";

export const newCharacterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  description: z.string(),
  seriesId: z.number(),
  rpgSystemId: z.number(),
});

type NewCharacaterSchemaType = z.infer<typeof newCharacterSchema>;

export const NewCharacterForm: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCharacaterSchemaType>({
    resolver: zodResolver(newCharacterSchema),
    reValidateMode: "onSubmit",
  });

  const { mutateAsync: addCharacter } = useAddCharacter();

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

  const submit = (payload: NewCharacaterSchemaType) => {
    try {
      addCharacter(payload);
      onSubmit();
      message.success("Gracz pomyślnie dodany");
    } catch (error) {
      message.error(`Nie udało się dodać gracza. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }}>Dodaj nową postać</Title>
      <ControlledInput
        name="firstName"
        label="Imię"
        control={control}
        errors={errors}
      />
      <ControlledInput
        name="lastName"
        label="Nazwisko"
        control={control}
        errors={errors}
      />

      <ControlledNumberInput
        name="age"
        label="Wiek"
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
