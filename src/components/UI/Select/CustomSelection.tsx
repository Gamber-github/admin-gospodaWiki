import Select, { SelectProps } from "antd/es/select";
import Space from "antd/es/space";
import { forwardRef } from "react";
import { Status, StatusAsyncHelper } from "../../AsyncHelper/StatusAsyncHelper";

type SelectionProps = {
  valueId: number;
  name: string;
};

type SelectionDataProps<T> = {
  data: T;
};

type SeriesSelectionComponentProps<T> = {
  data?: SelectionProps[] | SelectionProps;
  onChange: (value: number[]) => void;
  singleSelection?: boolean;
  selectionData: SelectionDataProps<T>;
  error: unknown;
  status: Status | Status[];
};

export const CustomSelection = forwardRef<
  HTMLDivElement,
  SeriesSelectionComponentProps<unknown>
>((props, ref) => {
  const { data, onChange, singleSelection, selectionData, error, status } =
    props;

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  const handleChange = (value: number[]) => {
    onChange(value);
  };

  const options: SelectProps["options"] = (
    selectionData.data as SelectionProps[]
  ).map((value) => ({
    label: value.name,
    value: value.valueId,
  }));

  const defaultValue = data
    ? Array.isArray(data)
      ? data.map((value) => value.valueId)
      : [data.valueId]
    : [];

  return (
    <Space ref={ref} style={{ width: "100%" }} direction="vertical">
      {singleSelection ? (
        <Select
          allowClear
          showSearch
          style={{ width: "100%" }}
          placeholder="Wybierz"
          defaultValue={defaultValue}
          onChange={handleChange}
          options={options}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            ((optionA?.label as string) ?? "")
              .toLowerCase()
              .localeCompare(((optionB?.label as string) ?? "").toLowerCase())
          }
        />
      ) : (
        <Select
          mode="multiple"
          allowClear
          showSearch
          style={{ width: "100%" }}
          placeholder="Wybierz"
          defaultValue={defaultValue}
          onChange={handleChange}
          options={options}
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            ((optionA?.label as string) ?? "")
              .toLowerCase()
              .localeCompare(((optionB?.label as string) ?? "").toLowerCase())
          }
        />
      )}
    </Space>
  );
});
