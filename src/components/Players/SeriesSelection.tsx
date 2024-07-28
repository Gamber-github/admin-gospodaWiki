import Select, { SelectProps } from "antd/es/select";
import Space from "antd/es/space";
import { forwardRef } from "react";
import { useGetSeries } from "../../api/series";
import { StatusAsyncHelper } from "../AsyncHelper/StatusAsyncHelper";

type SeriesSelectionProps = {
  seriesId: number;
  name: string;
}[];

type SeriesSelectionComponentProps = {
  data: SeriesSelectionProps;
  onChange: (value: number[]) => void;
};

export const SeriesSelection = forwardRef<
  HTMLDivElement,
  SeriesSelectionComponentProps
>((props, ref) => {
  const { data, onChange } = props;

  const { data: seriesData, error, status } = useGetSeries();

  if (status !== "success")
    return <StatusAsyncHelper status={status} error={error} />;

  const handleChange = (value: number[]) => {
    onChange(value);
  };

  const options: SelectProps["options"] = seriesData.items.map(
    (serie: { name: string; seriesId: number }) => ({
      label: serie.name,
      value: serie.seriesId,
    })
  );

  const defaultValue = data.map((serie) => serie.seriesId);

  return (
    <Space ref={ref} style={{ width: "100%" }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Wybierz serię"
        defaultValue={defaultValue}
        onChange={handleChange}
        options={options}
      />
    </Space>
  );
});
