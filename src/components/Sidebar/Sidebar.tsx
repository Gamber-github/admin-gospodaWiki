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
      key: "rpgSystems",
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
    {
      key: "events",
      label: "Eventy",
      icon: <UserOutlined />,
      onClick: () => navigate("events"),
    },
    {
      key: "locations",
      label: "Lokacje eventowe",
      icon: <CalendarOutlined />,
      onClick: () => navigate("locations"),
    },
    {
      key: "tags",
      label: "Tagi",
      icon: <TagOutlined />,
      onClick: () => navigate("tags"),
    },
    { key: "divider", type: "divider" },
    {
      icon: <LogoutOutlined />,
      label: "Wyloguj się",
      key: "logout",

      onClick: () => logout(),
    },
  ];

  return (
    <>
      <Menu
        style={{ paddingTop: "5rem", width: 260 }}
        mode="inline"
        items={items}
        defaultSelectedKeys={[current]}
      />
    </>
  );
};

export default Sidebar;
