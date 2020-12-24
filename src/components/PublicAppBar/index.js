import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { UserContext } from "contexts/Providers/UserProvider";
import { Trans } from "react-i18next";
import { useHistory } from "react-router-dom";
import ProfileButton from "theme/Header/ProfileButton";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const themeContext = useContext(ThemeContext);
  const history = useHistory();
  useEffect(() => {
    if (props.title) themeContext.setTitle(props.title);
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
  </IconButton>*/}
          <img
            width="30px"
            className="mr-3"
            src={process.env.PUBLIC_URL + "/img/logos/shortLogo.svg"}
            alt="Main logo"
          />
          <Typography variant="h6" className={classes.title}>
            <Trans>{props.title}</Trans>
          </Typography>
          <Tooltip title={<Trans>publicAppBar.goToApp</Trans>}>
            <IconButton
              onClick={() => {
                history.push("/auth/login");
              }}
            >
              <ExitToAppOutlinedIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {props.children}
    </div>
  );
}
