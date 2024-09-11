import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { Controller, Control, FieldErrors } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for ReactQuill

interface ControlledInputProps {
  control: Control;
  errors: FieldErrors;
  name: string;
  label: string;
  defaultValue?: string;
  disabled?: boolean;
}

export const ControlledTextArea: React.FC<ControlledInputProps> = ({
  control,
  errors,
  name,
  label,
  defaultValue,
  disabled,
}) => {
  const [editorValue, setEditorValue] = useState(defaultValue || "");

  useEffect(() => {
    setEditorValue(defaultValue || "");
  }, [defaultValue]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"], // remove formatting button
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
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
          <ReactQuill
            {...field}
            value={editorValue}
            onChange={(content) => {
              setEditorValue(content);
              field.onChange(content);
            }}
            placeholder={label || name}
            readOnly={disabled}
            modules={modules}
            formats={formats}
          />
        )}
      />
    </Form.Item>
  );
};
