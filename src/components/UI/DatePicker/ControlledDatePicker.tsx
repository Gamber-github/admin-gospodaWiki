import { DatePicker as AntDatePicker, DatePickerProps, Form } from "antd";
import { ControlledElement } from "../types";
import { ControlledInputProps } from "../Input/ControlledInput";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import styled from "styled-components";

export const DatePicker: React.FC<DatePickerProps & { label?: string }> = ({
  label,
  ...props
}) => (
  <Wrap>
    {label && <Label>{label}</Label>}
    <AntDatePicker style={{ width: "100%" }} {...props} />
  </Wrap>
);

export const ControlledDatePicker: ControlledElement<ControlledInputProps> = ({
  control,
  errors,
  name,
  label,
}) => (
  <Form.Item
    label={label || name}
    help={errors.date?.message as string}
    validateStatus={errors.date ? "error" : ""}
  >
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DatePicker
          {...field}
          value={field.value ? dayjs(field.value) : null}
          onChange={(date) => field.onChange(date.toISOString())}
          placeholder={label}
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
