import React from "react";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import CallToActionOutlinedIcon from "@material-ui/icons/CallToActionOutlined";

const SidebarMenu = [
  {
    type: "item",
    id: "Dashboard",
    to: "/dashboard",
    icon: <DashboardOutlinedIcon />,
    exact: true,
  },
  {
    id: "divider1",
    type: "divider",
  },
  {
    type: "item",
    id: "Helpers",
    to: "/helpers",
    icon: <CallToActionOutlinedIcon />,
    exact: true,
  },
];

export default SidebarMenu;
