import React, { useContext } from "react";
import classnames from "classnames";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { makeStyles } from "@material-ui/core/styles";
import config from "configuration/config";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Navigation from "./Navigation";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import CustomScrollbar from "components/CustomScrollbar";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  drawer: {
    zIndex: 1, // ? In order to let cookie consent available to see

    width: config.theme.sidebar.drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    overflowX: "hidden",
  },
  drawerOpen: {
    overflowY: "hidden",
    overflowX: "hidden",
    width: config.theme.sidebar.drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3,
    }),
  },
  drawerClose: {
    overflowY: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3,
    }),
    overflowX: "hidden",
    width: theme.spacing(9) + 1,
  },
  fixMobileScrollBar: {
    overflowY: "hidden",
  },
  imageLogo: {
    opacity: 1,
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 5,
    }),
  },
  imageLogoClose: {
    opacity: 0,
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logobar: (props) => ({
    display: "flex",
    alignItems: "center",
    justifyContent:
      props.sidebarOpenedEvent === "click" ? "space-between" : "center",
    padding: theme.spacing(0, 1),
    marginLeft: props.sidebarOpenedEvent === "click" ? 10 : 0,
    height: theme.mixins.toolbar.minHeight,
    //? necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }),
}));

function Sidebar(props) {
  const {
    handleDrawerCloseOnHover,
    handleDrawerOpenOnHover,
    handleDrawerOpenOnClick,
    handleDrawerCloseOnClick,
  } = props;
  const themeContext = useContext(ThemeContext);
  const matches = useMediaQuery("(max-width:" + config.mobileScreenWidth + ")");
  const classes = useStyles({
    matches,
    sidebarOpenedEvent: themeContext.sidebarOpenedEvent,
  });
  const history = useHistory();
  let sidebarProperties = !matches && {
    variant: "permanent",
    classes: {
      paper: classnames(classes.paperDrawer, {
        [classes.drawerOpen]: themeContext.sidebarOpen,
        [classes.drawerClose]: !themeContext.sidebarOpen,
      }),
    },
    className: classnames(classes.drawer, {
      [classes.drawerOpen]: themeContext.sidebarOpen,
      [classes.drawerClose]: !themeContext.sidebarOpen,
    }),
  };
  return (
    <SwipeableDrawer
      onClose={handleDrawerCloseOnClick}
      onOpen={handleDrawerOpenOnClick}
      open={themeContext.sidebarOpen}
      classes={{
        paper: classes.fixMobileScrollBar,
      }}
      {...sidebarProperties}
    >
      <div id="logobar" className={classes.logobar}>
        <img
          className={classnames(classes.imageLogo, {
            [classes.imageLogoClose]: !themeContext.sidebarOpen,
          })}
          alt={"Logo"}
          onClick={() => {
            history.push("/");
          }}
          width={160}
          src={process.env.PUBLIC_URL + "/img/logos/longLogo.svg"}
        />
        {themeContext.sidebarOpen && (
          <>
            {themeContext.sidebarOpenedEvent === "click" && !matches && (
              <IconButton onClick={handleDrawerCloseOnClick}>
                <ChevronLeftIcon />
              </IconButton>
            )}
          </>
        )}
      </div>
      <Divider />

      <CustomScrollbar>
        <span
          onMouseEnter={handleDrawerOpenOnHover}
          onMouseLeave={handleDrawerCloseOnHover}
        >
          <Navigation />
        </span>
      </CustomScrollbar>
    </SwipeableDrawer>
  );
}

export default Sidebar;
