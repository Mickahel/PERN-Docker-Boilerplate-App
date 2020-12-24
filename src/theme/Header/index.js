import React, { useContext } from "react";
import classnames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import config from "configuration/config";
import { Helmet } from "react-helmet";
import { Trans, useTranslation } from "react-i18next";
import ProfileButton from "theme/Header/ProfileButton";

const useStyles = makeStyles((theme) => ({
  appBarBase: {
    boxShadow: config.theme.header.shadow
      ? "0px 10px 10px rgba(151, 151, 151, 0.1)"
      : "unset",
    backgroundColor: config.theme.header.color,
  },
  appBar: (props) => ({
    //zIndex: theme.zIndex.drawer + (props.sidebarOpen ? 0 : 1),
    //zIndex: theme.zIndex.drawer + 1,
    //padding: 0,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3.3,
    }),
  }),
  title: {
    fontSize: "1.15rem",
  },
  appBarShift: {
    marginLeft: config.theme.sidebar.drawerWidth,
    width: `calc(100% - ${config.theme.sidebar.drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3.3,
    }),
  },
  menuButton: {
    marginRight: 36,
    padding: 12,
    opacity: 1,
    transition: theme.transitions.create(["margin", "opacity", "padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3.3,
    }),
  },
  toolbarShift: {
    paddingLeft: "0 !important",
    transition: theme.transitions.create(["padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3.3,
    }),
  },
  toolbar: {
    paddingLeft: 24,
    transition: theme.transitions.create(["padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3.3,
    }),
  },
  hide: {
    marginRight: 0,
    opacity: 0,
    padding: 0,
    transition: theme.transitions.create(["margin", "opacity", "padding"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3.3,
    }),
  },
}));

function Header(props) {
  const { handleDrawerOpenOnClick } = props;
  const themeContext = useContext(ThemeContext);
  const { icon, title, headerVisible } = themeContext;
  const [t, i18n] = useTranslation();
  const matches = useMediaQuery("(max-width:" + config.mobileScreenWidth + ")");
  const classes = useStyles({ sidebarOpen: themeContext.sidebarOpen });
  if (!headerVisible) return null;
  return (
    <AppBar
      position="fixed"
      className={classnames(
        classes.appBarBase,
        !matches && classes.appBar,
        !matches && { [classes.appBarShift]: themeContext.sidebarOpen }
      )}
    >
      {title ? (
        <Helmet title={`${config.name.short} - ${t(title)}`} />
      ) : (
        <Helmet title={config.name.long} />
      )}

      <Toolbar
        {...(!matches && {
          className: classnames(classes.toolbar, {
            [classes.toolbarShift]: themeContext.sidebarOpen,
          }),
        })}
      >
        {themeContext.showSidebarComponents(matches) && (
          <IconButton
            color="inherit"
            onClick={handleDrawerOpenOnClick}
            edge="start"
            {...(!matches && {
              className: classnames(classes.menuButton, {
                [classes.hide]: themeContext.sidebarOpen,
              }),
            })}
          >
            <MenuIcon />
          </IconButton>
        )}
        <span className="flex  items-center w-full">
          {icon}
          <span className="mt-1">
            <Typography
              variant="h6"
              classes={{
                h6: matches && classes.title,
              }}
            >
              <span className="ml-2">
                <Trans>{title}</Trans>
              </span>
            </Typography>
          </span>
          <ProfileButton />
        </span>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
