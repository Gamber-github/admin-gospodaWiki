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
    min-height: calc(
      5 * 54px
    ); /* Assuming each row is approximately 54px high */
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

  const filterUnpublished = <T extends { isPublished: boolean }>(
    data: T[]
  ): T[] => {
    return data.filter((item) => !item.isPublished);
  };

  const players = playersData ? filterUnpublished(playersData.items) : [];
  const items = itemsData ? filterUnpublished(itemsData.items) : [];
  const series = seriesData ? filterUnpublished(seriesData.items) : [];
  const adventures = adventuresData
    ? filterUnpublished(adventuresData.items)
    : [];
  const characters = charactersData
    ? filterUnpublished(charactersData.items)
    : [];
  const events = eventsData ? filterUnpublished(eventsData.items) : [];
  const locations = locationsData ? filterUnpublished(locationsData.items) : [];
  const rpgSystems = rpgSystemsData
    ? filterUnpublished(rpgSystemsData.items)
    : [];

  const generateColumns = (entity: string, idField: keyof RecordType) => [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: unknown, record: RecordType) =>
        entity === "characters"
          ? record.fullname
          : `${record.firstName || ""} ${record.lastName || record.name || ""}`,
    },
    {
      title: "Published",
      dataIndex: "isPublished",
      key: "isPublished",
      render: (isPublished: boolean) => (isPublished ? "Yes" : "No"),
    },
    {
      title: "Details",
      key: "details",
      render: (_: unknown, record: RecordType) => (
        <Link to={`/${entity}/${record[idField]}/edit`}>View Details</Link>
      ),
    },
  ];

  const noDataText = "There is no data to display";

  return (
    <div>
      <Title level={2}>Dashboard</Title>

      <TableContainer>
        <TableWrapper>
          <Title level={3}>Players</Title>
          {playersStatus !== "success" ? (
            <StatusAsyncHelper status={playersStatus} error={playersError} />
          ) : (
            <StyledTable
              dataSource={players}
              columns={generateColumns("players", "playerId")}
              rowKey="playerId"
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Items</Title>
          {itemsStatus !== "success" ? (
            <StatusAsyncHelper status={itemsStatus} error={itemsError} />
          ) : (
            <StyledTable
              dataSource={items}
              columns={generateColumns("items", "itemId")}
              rowKey="itemId"
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Series</Title>
          {seriesStatus !== "success" ? (
            <StatusAsyncHelper status={seriesStatus} error={seriesError} />
          ) : (
            <StyledTable
              dataSource={series}
              columns={generateColumns("series", "seriesId")}
              rowKey="seriesId"
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Adventures</Title>
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
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Characters</Title>
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
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Events</Title>
          {eventsStatus !== "success" ? (
            <StatusAsyncHelper status={eventsStatus} error={eventsError} />
          ) : (
            <StyledTable
              dataSource={events}
              columns={generateColumns("events", "eventId")}
              rowKey="eventId"
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>Locations</Title>
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
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>

        <TableWrapper>
          <Title level={3}>RPG Systems</Title>
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
              pagination={{ pageSize: 5 }}
              locale={{ emptyText: noDataText }}
            />
          )}
        </TableWrapper>
      </TableContainer>
    </div>
  );
};

export default Dashboard;
