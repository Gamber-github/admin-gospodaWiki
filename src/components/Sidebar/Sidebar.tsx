import React, { useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
  MehOutlined,
  TagOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthUser } from "../../store/AuthUserProvider";
import { useNav } from "../../routes/router";
import styled from "styled-components";
import { Flex } from "../UI/CustomStyles/CustomStyles";
import Logo from "../../assets/logo.png";
import Layout from "antd/es/layout/layout";
const Sider = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const Sidebar: React.FC = () => {
  const { logout } = useAuthUser();
  const [current, setCurrent] = useState<string>("");

  const { navigate } = useNav();

  useEffect(() => {
    const pathKey = window.location.pathname.split("/")[1];
    setCurrent(pathKey);
  }, []);

  const items: MenuItem[] = [
    {
      key: "dashboard",
      label: "Strona Główna",
      icon: <HomeOutlined />,
      onClick: () => navigate("dashboard"),
    },
    { key: "divider1", type: "divider" },
    {
      key: "grp1",
      label: "Dane fabularne",
      type: "group",
      children: [
        {
          key: "players",
          label: "Gracze",
          icon: <UserOutlined />,
          onClick: () => navigate("players"),
        },
        {
          key: "characters",
          label: "Postacie",
          icon: <MehOutlined />,
          onClick: () => navigate("characters"),
        },
        {
          key: "rpg-systems",
          label: "Systemy RPG",
          icon: <BookOutlined />,
          onClick: () => navigate("rpgSystems"),
        },
        {
          key: "items",
          label: "Przedmioty fabularne",
          icon: <ToolOutlined />,
          onClick: () => navigate("items"),
        },
        {
          key: "series",
          label: "Serie fabularne",
          icon: <EditOutlined />,
          onClick: () => navigate("series"),
        },
      ],
    },
    { key: "divider2", type: "divider" },
    {
      key: "grp2",
      label: "Eventy",
      type: "group",
      children: [
        {
          key: "events",
          label: "Event",
          icon: <UserOutlined />,
          onClick: () => navigate("events"),
        },
        {
          key: "locations",
          label: "Lokacja eventowa",
          icon: <CalendarOutlined />,
          onClick: () => navigate("locations"),
        },
      ],
    },

    { key: "divider3", type: "divider" },
    {
      key: "grp3",
      label: "Dodatkowe",
      type: "group",
      children: [
        {
          key: "tags",
          label: "Tagi",
          icon: <TagOutlined />,
          onClick: () => navigate("tags"),
        },
      ],
    },
    { key: "divider4", type: "divider" },
    {
      icon: <LogoutOutlined />,
      label: "Wyloguj się",
      key: "logout",

      onClick: () => logout(),
    },
  ];

  return (
    <StyledSider>
      <LogoContainer>
        <StyledImg src={Logo} alt="Logo" />
      </LogoContainer>
      <Menu mode="vertical" items={items} defaultSelectedKeys={[current]} />
    </StyledSider>
  );
};

export const LogoContainer = styled(Flex)`
  background-color: #fff;
  min-height: 80px;
  height: 100px;
`;

export const StyledImg = styled.img`
  height: 70px;
  margin: auto;
`;

export const StyledSider = styled(Sider)`
  min-width: 250px;
  max-width: 250px;
  &&& {
    .ant-layout-sider-children {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default Sidebar;
