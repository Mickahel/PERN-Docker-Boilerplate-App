import React, { useContext } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
const useStyles = makeStyles((theme) => ({
  badge: {
    opacity: 0,
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  badgeShift: {
    opacity: 1,
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
      delay: 500,
    }),
  },
}));

function NavBadge({ badge }) {
  const themeContext = useContext(ThemeContext);
  const classes = useStyles();
  return (
    <Chip
      className={classnames("ml-3", classes.badge, {
        [classes.badgeShift]: themeContext.sidebarOpen,
      })}
      variant="outlined"
      size="small"
      label={badge.title}
      icon={badge.icon}
    />
  );
}

NavBadge.propTypes = {
  badge: PropTypes.shape({
    title: PropTypes.node,
  }),
};

NavBadge.defaultProps = {};

export default NavBadge;
