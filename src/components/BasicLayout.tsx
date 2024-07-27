import Table, { TableProps } from "antd/es/table";
import React, { useState } from "react";
import { useCharacters } from "../api/characters";
import styled from "styled-components";
import { buildPagination } from "./helpers";

const BasicLayout: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useCharacters({
    pageNumber: page,
    pageSize: 10,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  interface CharacterData {
    characterId: number;
    fullName: string;
    seriesName: string;
    rpgSystemName: string;
    isPublished: boolean;
  }

  const columns: TableProps<CharacterData>["columns"] = [
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

  return (
    <Container>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(item) => item.characterId}
        pagination={buildPagination(data, setPage)}
      />
    </Container>
  );
};

export default BasicLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;
