import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { Trans } from "react-i18next";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@material-ui/icons/ArrowDropUpOutlined";
import Divider from "@material-ui/core/Divider";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import Brightness3OutlinedIcon from "@material-ui/icons/Brightness3Outlined";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import { UserContext } from "contexts/Providers/UserProvider";
import InstallPWAButton from "theme/Header/InstallPWAButton";
import Feedback from "theme/Header/Feedback";
import useFetch from "hooks/useFetch";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import config from "configuration/config";
import Endpoints from "Endpoints";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function ProfileButton(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const history = useHistory();
  const matches = useMediaQuery("(max-width:" + config.mobileScreenWidth + ")");
  const { fetch } = useFetch();
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className="profileButton flex-grow flex justify-end">
      <Tooltip title={<Trans>profileButton.profile</Trans>}>
        <Button
          color="inherit"
          id="avatarButton"
          size="small"
          onClick={handleClick}
        >
          <Avatar
            className={classes.small}
            src={userContext.user.profileImageUrl &&
              process.env.REACT_APP_API_PUBLIC_URL +
              userContext.user.profileImageUrl
            }
          ></Avatar>
          {!matches && (
            <span className="ml-2">
              <Typography variant="body2">
                {userContext?.user?.firstname || (
                  <Trans>profileButton.welcome</Trans>
                )}
              </Typography>
            </span>
          )}
          {anchorEl ? (
            <ArrowDropUpOutlinedIcon fontSize="small" className="dropIcon" />
          ) : (
              <ArrowDropDownOutlinedIcon fontSize="small" className="dropIcon" />
            )}
        </Button>
      </Tooltip>

      <Menu
        elevation={2}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        id="profileMenu"
      >
        <MenuItem
          onClick={() => {
            history.push("/account/profile");
            setAnchorEl(false);
          }}
          dense={true}
        >
          <span className="menuItem">
            <PersonOutlineOutlinedIcon
              className="menuProfileIcon"
              color="action"
              fontSize="small"
            />
            <Typography color="textSecondary" variant="body2">
              <Trans>profileButton.profile</Trans>
            </Typography>
          </span>
        </MenuItem>

        <MenuItem onClick={themeContext.toggleMuiType} dense={true}>
          <span className="menuItem">
            {themeContext.muiType === "light" ? (
              <WbSunnyOutlinedIcon
                className="menuProfileIcon"
                color="action"
                fontSize="small"
              />
            ) : (
                <Brightness3OutlinedIcon
                  className="menuProfileIcon"
                  color="action"
                  fontSize="small"
                />
              )}
            <Typography color="textSecondary" variant="body2">
              <Trans>profileButton.changeTheme</Trans>
            </Typography>
          </span>
        </MenuItem>
        <Feedback closeMenu={() => setAnchorEl(false)} />
        <InstallPWAButton />

        <Divider variant="middle" />
        <MenuItem
          onClick={async () => {
            try {
              await fetch({
                url: Endpoints.auth.logout,
                method: "DELETE",
              });
              history.push("/auth/login");
              userContext.setUser(undefined);
            } catch (e) { }
          }}
          dense={true}
        >
          <span className="menuItem">
            <ExitToAppOutlinedIcon
              className="menuProfileIcon"
              color="action"
              fontSize="small"
            />
            <Typography color="textSecondary" variant="body2">
              <Trans>auth.logout</Trans>
            </Typography>
          </span>
        </MenuItem>
      </Menu>
    </div>
  );
}
export default ProfileButton;
