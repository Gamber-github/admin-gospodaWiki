/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, InputNumber as AntInputNumber, InputNumberProps } from "antd";

import { ControlledElement } from "../types";
import { Controller } from "react-hook-form";
import styled from "styled-components";

export type ControlledInputProps = {
  label?: string;
  limit?: number;
  description?: string;
  defaultValue?: number;
  disabled?: boolean;
};

export const InputNumber: React.FC<
  InputNumberProps & { isError?: boolean; label?: string }
> = ({ label, isError, ...props }) => {
  return (
    <Wrap>
      {label && <Label>{label}</Label>}
      <AntInputNumber {...props} status={isError ? "error" : ""} />
    </Wrap>
  );
};

export const ControlledNumberInput: ControlledElement<ControlledInputProps> = ({
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
        <InputNumber
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
