import Select, { SelectProps } from "antd/es/select";
import Space from "antd/es/space";
import { forwardRef } from "react";
import { StatusAsyncHelper } from "../../AsyncHelper/StatusAsyncHelper";
import { useGetRpgSystems } from "../../../api/rpgSystems";

type RpgSystemSelectionProps = {
  rpgSystemId: number;
  name: string;
};

type RpgSystemSelectionComponentProps = {
  data: RpgSystemSelectionProps[] | RpgSystemSelectionProps;
  onChange: (value: number[]) => void;
  singleSelection?: boolean;
};

export const RpgSystemSelection = forwardRef<
  HTMLDivElement,
  RpgSystemSelectionComponentProps
>((props, ref) => {
  const { data, onChange, singleSelection } = props;

  const { data: rpgSystemData, error, status } = useGetRpgSystems();

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  const handleChange = (value: number[]) => {
    onChange(value);
  };

  const options: SelectProps["options"] = rpgSystemData.items.map(
    (rpgSystem) => ({
      label: rpgSystem.name,
      value: rpgSystem.rpgSystemId,
    })
  );

  const defaultValue = Array.isArray(data)
    ? data.map((serie) => serie.rpgSystemId)
    : [data.rpgSystemId];

  return (
    <Space ref={ref} style={{ width: "100%" }} direction="vertical">
      {singleSelection ? (
        <Select
          allowClear
          style={{ width: "100%" }}
          placeholder="Wybierz system RPG"
          defaultValue={defaultValue}
          onChange={handleChange}
          options={options}
        />
      ) : (
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Wybierz systemy RPG"
          defaultValue={defaultValue}
          onChange={handleChange}
          options={options}
        />
      )}
    </Space>
  );
});
