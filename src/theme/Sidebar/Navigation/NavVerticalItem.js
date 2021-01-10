import React, { useContext } from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import NavBadge from "./NavBadge";
import PropTypes from "prop-types";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { Trans } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import config from "configuration/config";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { matchPath } from "react-router";
const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: 23,
  },
  listItemIcon: (props) => ({
    minWidth: props.matches ? 35 : 50,
  }),
  activeColor: {
    color: config.theme.sidebar.activeColor,
  },
}));

function NavVerticalItem(props) {
  const themeContext = useContext(ThemeContext);
  const matches = useMediaQuery("(max-width:" + config.mobileScreenWidth + ")");
  const history = useHistory();
  const classes = useStyles({ matches });

  const navBarCloseMobile = () => {
    themeContext.setSidebarOpen(false);
  };
  const { item, nestedLevel } = props;
  let paddingValue = nestedLevel * 3;
  const listItemPadding =
    nestedLevel > 0 ? "pl-" + (paddingValue > 80 ? 80 : paddingValue) : "";

  const checkIfActive = () => {
    if (_.isEmpty(item.to)) item.exact = false;
    const url = history.location.pathname + history.location.search;
    if (item.to) return matchPath(url, { path: item.to, exact: item.exact });
    return false;
  };
  return (
    <ListItem
      button
      className={classnames(classes.listItem)}
      onClick={(event) => {
        if (item.to) history.push(item.to);
        else if (item.redirectUrl) window.open(item.redirectUrl);
        if (matches || themeContext.sidebarOpenedEvent === "click")
          navBarCloseMobile();
      }}
    >
      <ListItemIcon
        className={classnames(listItemPadding)}
        classes={{ root: classes.listItemIcon }}
      >
        <span
          className={classnames(
            "list-item-icon text-16 flex-no-shrink mr-2",
            checkIfActive() && classes.activeColor
          )}
        >
          {item.icon}
        </span>
      </ListItemIcon>

      <ListItemText
        primary={
          <Typography className="activeBolder" variant="body2">
            <Trans>{item.id}</Trans>
          </Typography>
        }
        classes={{ primary: "text-14" }}
      />
      {item.badge && <NavBadge badge={item.badge} />}
    </ListItem>
  );
}

NavVerticalItem.defaultProps = {};

NavVerticalItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default NavVerticalItem;
