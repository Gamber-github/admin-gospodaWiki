import { TableProps } from "antd";

export interface CharacterData {
  characterId: number;
  fullName: string;
  seriesName: string;
  rpgSystemName: string;
  isPublished: boolean;
}

export const columns: TableProps<CharacterData>["columns"] = [
  {
    title: "Imię i Nazwisko",
    dataIndex: "fullName",
    key: "fullName",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Seria",
    dataIndex: "seriesName",
    key: "seriesName",
  },
  {
    title: "System Rpg",
    dataIndex: "rpgSystemName",
    key: "rpgSystemName",
  },
  {
    title: "Opublikowany",
    dataIndex: "isPublished",
    key: "isPublished",
    render: (isPublished) => (isPublished ? "Tak" : "Nie"),
  },
  {
    title: "Akcje",
    key: "action",
    render: () => (
      <span>
        <a>Otwórz</a>
      </span>
    ),
  },
];
