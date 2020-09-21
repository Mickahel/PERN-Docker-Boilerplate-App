import React from 'react'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';


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