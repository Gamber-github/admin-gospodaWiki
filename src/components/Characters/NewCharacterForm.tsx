import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input, InputNumber, message } from "antd";
import Title from "antd/es/typography/Title";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useAddCharacter } from "../../api/characters";
import { CustomSelection } from "../UI/Select/CustomSelection";
import { useGetSeries } from "../../api/series";
import { useGetRpgSystems } from "../../api/rpgSystems";
import TextArea from "antd/es/input/TextArea";

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
      <Form.Item
        name="firstName"
        rules={[{ message: "Podaj imię gracza" }]}
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
        rules={[{ message: "Podaj nazwisko gracza" }]}
        help={errors.firstName?.message as string}
        validateStatus={errors.firstName ? "error" : ""}
      >
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <Input placeholder="Nazwisko" {...field} />}
        />
      </Form.Item>

      <Form.Item
        name="age"
        rules={[{ required: false, message: "Podaj wiek postaci" }]}
        help={errors.age?.message as string}
        validateStatus={errors.age ? "error" : ""}
      >
        <Controller
          name="age"
          control={control}
          render={({ field }) => <InputNumber placeholder="Wiek" {...field} />}
        />
      </Form.Item>
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

      <Form.Item
        name="description"
        rules={[{ required: false, message: "Podaj opis postaci" }]}
        help={errors.description?.message as string}
        validateStatus={errors.description ? "error" : ""}
      >
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea placeholder="Opis postaci" {...field} />
          )}
        />
      </Form.Item>

      <Button htmlType="submit" type="primary">
        Dodaj
      </Button>
    </Form>
  );
};
