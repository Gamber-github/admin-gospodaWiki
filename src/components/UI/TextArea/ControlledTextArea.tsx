/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Input as AntInput } from "antd";
import { ControlledElement } from "../types";
import { Controller } from "react-hook-form";
import { TextAreaProps } from "antd/es/input";
import { ControlledInputProps } from "../Input/ControlledInput";

const { TextArea: AntTextArea } = AntInput;

export const TextArea: React.FC<
  TextAreaProps & { isError?: boolean; maxLength?: number }
> = ({ maxLength, isError, ...props }) => {
  return (
    <AntTextArea
      {...props}
      status={isError ? "error" : ""}
      rows={6}
      maxLength={maxLength}
    />
  );
};

export const ControlledTextArea: ControlledElement<ControlledInputProps> = ({
  control,
  errors,
  name,
  label,
  defaultValue,
  disabled,
}) => (
  <Form.Item
    label={label}
    help={errors[name]?.message as string}
    validateStatus={errors[name] ? "error" : ""}
  >
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { ref, ...field } }) => (
        <TextArea
          {...field}
          placeholder={label || name}
          isError={!!errors[name]?.message}
          disabled={disabled}
        />
      )}
    />
  </Form.Item>
);
