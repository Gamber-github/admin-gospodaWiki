/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Input as AntInput } from "antd";
import { InputProps } from "antd/es/input";
import { ControlledElement } from "../types";
import { Controller } from "react-hook-form";
import styled from "styled-components";

export type ControlledInputProps = {
  label?: string;
  limit?: number;
  description?: string;
  defaultValue?: string;
  disabled?: boolean;
};

export const Input: React.FC<
  InputProps & { isError?: boolean; label?: string }
> = ({ label, isError, ...props }) => {
  return (
    <Wrap>
      {label && <Label>{label}</Label>}
      <AntInput {...props} status={isError ? "error" : ""} />
    </Wrap>
  );
};

export const ControlledInput: ControlledElement<ControlledInputProps> = ({
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
      render={({ field }) => (
        <Input
          {...field}
          placeholder={label || name}
          isError={!!errors[name]?.message}
          disabled={disabled}
        />
      )}
    />
  </Form.Item>
);

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
`;
