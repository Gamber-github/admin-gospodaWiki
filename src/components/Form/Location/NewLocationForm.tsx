import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ControlledInput } from "../../UI/Input/ControlledInput";
import { useAddLocation } from "../../../api/locations";

export const newLocationSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  locationURL: z.string().optional(),
});

type NewLocationSchemaType = z.infer<typeof newLocationSchema>;

export const NewLocationForm: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewLocationSchemaType>({
    resolver: zodResolver(newLocationSchema),
    reValidateMode: "onSubmit",
  });

  const { mutateAsync: AddMutation } = useAddLocation();

  const submit = async (payload: NewLocationSchemaType) => {
    try {
      await AddMutation(payload);
      onSubmit();
    } catch (error) {
      message.error(`Nie udało się dodać rekordu. Spróbuj ponownie`);
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }}>Dodaj nową locakcję</Title>
      <ControlledInput
        name="name"
        label="Nazwa"
        control={control}
        errors={errors}
      />
      <ControlledInput
        name="city"
        label="Miasto"
        control={control}
        errors={errors}
      />
      <ControlledInput
        name="address"
        label="Adres"
        control={control}
        errors={errors}
      />
      <ControlledInput
        name="locationURL"
        label="URL lokacji"
        control={control}
        errors={errors}
      />
      <Button htmlType="submit" type="primary">
        Dodaj
      </Button>
    </Form>
  );
};
