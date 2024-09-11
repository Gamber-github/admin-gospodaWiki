import React from "react";
import { Descriptions as AntDescriptions, DescriptionsProps } from "antd";

export type AntDescriptionsProps = {
  title: string;
  items: DescriptionsProps["items"];
  column?: number;
};

export const Descriptions: React.FC<AntDescriptionsProps> = ({
  title,
  items,
  column,
}) => {
  return (
    <AntDescriptions
      title={title}
      items={items}
      column={column ? column : 3}
      bordered
      layout="vertical"
    />
  );
};
