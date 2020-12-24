import React from "react";
import GroupOutlinedIcon from "@material-ui/icons/GroupOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import BarChartOutlinedIcon from "@material-ui/icons/BarChartOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
const BottombarMenu = [
  {
    id: "profile.profile",
    to: "/account/profile",
    icon: <PersonOutlineOutlinedIcon />,
  },
  {
    id: "dashboard.dashboard",
    to: "/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
];
export default BottombarMenu;
