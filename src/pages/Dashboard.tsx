import React from "react";
import { Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useGetPlayers } from "../api/players";
import { useGetItems } from "../api/items";
import { useGetSeries } from "../api/series";
import { useGetAdventures } from "../api/adventure";
import { useGetCharacters } from "../api/characters";
import { useGetEvents } from "../api/events";
import { useGetLocations } from "../api/locations";
import { useGetRpgSystems } from "../api/rpgSystems";
import { StatusAsyncHelper } from "../components/AsyncHelper/StatusAsyncHelper";
import styled from "styled-components";

const { Title } = Typography;

const TableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;

  @media (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TableWrapper = styled.div`
  margin: 0 16px;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const StyledTable = styled(Table)`
  .ant-table-body {
    min-height: calc(5 * 54px);
  }
`;

interface RecordType {
  playerId?: string;
  itemId?: string;
  seriesId?: string;
  adventureId?: string;
  characterId?: string;
  eventId?: string;
  locationId?: string;
  rpgSystemId?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  fullname?: string;
  isPublished: boolean;
}

const Dashboard: React.FC = () => {
  const {
    data: playersData,
    status: playersStatus,
    error: playersError,
  } = useGetPlayers();
  const {
    data: itemsData,
    status: itemsStatus,
    error: itemsError,
  } = useGetItems();
  const {
    data: seriesData,
    status: seriesStatus,
    error: seriesError,
  } = useGetSeries();
  const {
    data: adventuresData,
    status: adventuresStatus,
    error: adventuresError,
  } = useGetAdventures();
  const {
    data: charactersData,
    status: charactersStatus,
    error: charactersError,
  } = useGetCharacters();
  const {
    data: eventsData,
    status: eventsStatus,
    error: eventsError,
  } = useGetEvents();
  const {
    data: locationsData,
    status: locationsStatus,
    error: locationsError,
  } = useGetLocations();
  const {
    data: rpgSystemsData,
    status: rpgSystemsStatus,
    error: rpgSystemsError,
  } = useGetRpgSystems();

  const getLastFiveUnpublished = <T extends { isPublished: boolean }>(
    data: T[]
  ): T[] => {
    return data.filter((item) => !item.isPublished).slice(-5);
  };

  const players = playersData ? getLastFiveUnpublished(playersData.items) : [];
  const items = itemsData ? getLastFiveUnpublished(itemsData.items) : [];
  const series = seriesData ? getLastFiveUnpublished(seriesData.items) : [];
  const adventures = adventuresData
    ? getLastFiveUnpublished(adventuresData.items)
    : [];
  const characters = charactersData
    ? getLastFiveUnpublished(charactersData.items)
    : [];
  const events = eventsData ? getLastFiveUnpublished(eventsData.items) : [];
  const locations = locationsData
    ? getLastFiveUnpublished(locationsData.items)
    : [];
  const rpgSystems = rpgSystemsData
    ? getLastFiveUnpublished(rpgSystemsData.items)
    : [];

  const generateColumns = (entity: string, idField: keyof RecordType) => [
    {
      title: "Nazwa",
      dataIndex: "name",
      key: "name",
      render: (_: unknown, record: RecordType) =>
        entity === "characters"
          ? record.fullname
          : `${record.firstName || ""} ${record.lastName || record.name || ""}`,
    },
    {
      title: "Opublikowane",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (isPublished: boolean) => (isPublished ? "Tak" : "Nie"),
    },
    {
      title: "Akcja",
      key: "details",
      render: (_: unknown, record: RecordType) => (
        <Link to={`/${entity}/${record[idField]}/edit`}>Zobacz szczegóły</Link>
      ),
    },
  ];

  const noDataText = "There is no data to display";

  return (
    <div>
      <Title level={2}>Dashboard</Title>

      <TableContainer>
        <TableWrapper>
          <Title level={3}>Gracze</Title>
          {playersStatus !== "success" ? (
            <StatusAsyncHelper status={playersStatus} error={playersError} />
          ) : (
            <StyledTable
              dataSource={players}
              columns={generateColumns("players", "playerId")}
              rowKey="playerId"
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Przedmioty</Title>
          {itemsStatus !== "success" ? (
            <StatusAsyncHelper status={itemsStatus} error={itemsError} />
          ) : (
            <StyledTable
              dataSource={items}
              columns={generateColumns("items", "itemId")}
              rowKey="itemId"
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Serie</Title>
          {seriesStatus !== "success" ? (
            <StatusAsyncHelper status={seriesStatus} error={seriesError} />
          ) : (
            <StyledTable
              dataSource={series}
              columns={generateColumns("series", "seriesId")}
              rowKey="seriesId"
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Przygody</Title>
          {adventuresStatus !== "success" ? (
            <StatusAsyncHelper
              status={adventuresStatus}
              error={adventuresError}
            />
          ) : (
            <StyledTable
              dataSource={adventures}
              columns={generateColumns("adventures", "adventureId")}
              rowKey="adventureId"
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Postacie</Title>
          {charactersStatus !== "success" ? (
            <StatusAsyncHelper
              status={charactersStatus}
              error={charactersError}
            />
          ) : (
            <StyledTable
              dataSource={characters}
              columns={generateColumns("characters", "characterId")}
              rowKey="characterId"
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Eventy</Title>
          {eventsStatus !== "success" ? (
            <StatusAsyncHelper status={eventsStatus} error={eventsError} />
          ) : (
            <StyledTable
              dataSource={events}
              columns={generateColumns("events", "eventId")}
              rowKey="eventId"
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Lokacje eventowe</Title>
          {locationsStatus !== "success" ? (
            <StatusAsyncHelper
              status={locationsStatus}
              error={locationsError}
            />
          ) : (
            <StyledTable
              dataSource={locations}
              columns={generateColumns("locations", "locationId")}
              rowKey="locationId"
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Systemy RPG</Title>
          {rpgSystemsStatus !== "success" ? (
            <StatusAsyncHelper
              status={rpgSystemsStatus}
              error={rpgSystemsError}
            />
          ) : (
            <StyledTable
              dataSource={rpgSystems}
              columns={generateColumns("rpgSystems", "rpgSystemId")}
              rowKey="rpgSystemId"
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
