import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import BottomNavigation from "theme/BottomNavigation";
import config from "configuration/config";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
}));

export default function Theme(props) {
  const classes = useStyles();
  const themeContext = useContext(ThemeContext);
  const handleDrawerCloseOnHover = () => isOpen(false, "hover");
  const handleDrawerOpenOnHover = () => isOpen(true, "hover");
  const handleDrawerOpenOnClick = () => isOpen(true, "click");
  const handleDrawerCloseOnClick = () => isOpen(false, "click");
  const matches = useMediaQuery("(max-width:" + config.mobileScreenWidth + ")");

  const isOpen = (value, openType) => {
    if (
      themeContext.sidebarOpenedEvent === "click" &&
      openType == "hover" &&
      themeContext.sidebarOpen === true
    )
      return;
    themeContext.setSidebarOpen(value);
    themeContext.setSidebarOpenedEvent(openType);
  };
  return (
    <div className="flex h-full">
      {config.theme.header.enabled && (
        <Header handleDrawerOpenOnClick={handleDrawerOpenOnClick} />
      )}
      {themeContext.showSidebarComponents(matches) && (
        <Sidebar
          handleDrawerOpenOnHover={handleDrawerOpenOnHover}
          handleDrawerCloseOnHover={handleDrawerCloseOnHover}
          handleDrawerCloseOnClick={handleDrawerCloseOnClick}
          handleDrawerOpenOnClick={handleDrawerOpenOnHover}
        />
      )}
      <div className="w-full h-full overflow-x-hidden">
        <div className="contentHeight">
          <div className={classes.toolbar} />
          {props.children}
        </div>
        <div>
          {config.theme.bottomNavigation.enabled && <BottomNavigation />}
        </div>
      </div>
    </div>
  );
}
