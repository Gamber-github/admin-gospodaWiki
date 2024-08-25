import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Input } from "antd";
import Title from "antd/es/typography/Title";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useAddTag } from "../../../api/tags";

export const newTagSchema = z.object({
  name: z.string(),
});

type NewTagSchemaType = z.infer<typeof newTagSchema>;

export const NewTagForm: React.FC<{
  onSubmit: () => void;
}> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTagSchemaType>({
    resolver: zodResolver(newTagSchema),
    reValidateMode: "onSubmit",
  });

  const { mutateAsync: AddMutation } = useAddTag();

  const submit = (payload: NewTagSchemaType) => {
    AddMutation(payload);
    onSubmit();
  };

  return (
    <Form onSubmitCapture={handleSubmit(submit)}>
      <Title style={{ marginBottom: "1rem" }}>Dodaj nowy Tag</Title>
      <Form.Item
        name="name"
        rules={[{ required: true }]}
        help={errors.name?.message as string}
        validateStatus={errors.name ? "error" : ""}
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input placeholder="Tag" {...field} />}
        />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        Dodaj
      </Button>
    </Form>
  );
};
