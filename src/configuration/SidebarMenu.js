import React from 'react'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';


const SidebarMenu = [
    {
        type: "item",
        id: 'Dashboard',
        to: "/dashboard",
        icon: <DashboardOutlinedIcon />,
        exact: true,
    },
    {
        id: "divider1",
        type: "divider"
    }
]


export default SidebarMenu