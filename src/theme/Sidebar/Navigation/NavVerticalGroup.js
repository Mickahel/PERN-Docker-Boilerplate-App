import React, { useContext } from "react";
import NavVerticalCollapse from "./NavVerticalCollapse";
import NavVerticalItem from "./NavVerticalItem";
import { ListSubheader } from "@material-ui/core";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
const useStyles = makeStyles((theme) => ({
  uppercaseText: {
    textTransform: "uppercase",
  },
}));

function NavVerticalGroup(props) {
  const { item, nestedLevel } = props;
  const classes = useStyles();
  const themeContext = useContext(ThemeContext);
  let paddingValue = nestedLevel * 3;

  const listItemPadding =
    nestedLevel > 0 ? "pl-" + (paddingValue > 80 ? 80 : paddingValue) : "";
  return (
    <>
      {themeContext.sidebarOpen && (
        <ListSubheader disableSticky={true}>
          <span className={classnames(classes.uppercaseText)}>
            <Typography variant="body2">
              <span className={classNames(listItemPadding)}>
                <Trans>{item.id}</Trans>
              </span>
            </Typography>
          </span>
        </ListSubheader>
      )}

      {item.children && (
        <>
          {item.children.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "group" && (
                <NavVerticalGroup item={item} nestedLevel={nestedLevel + 1} />
              )}

              {item.type === "collapse" && (
                <NavVerticalCollapse
                  item={item}
                  nestedLevel={nestedLevel + 1}
                />
              )}

              {item.type === "item" && (
                <NavVerticalItem item={item} nestedLevel={nestedLevel} />
              )}
            </React.Fragment>
          ))}
        </>
      )}
    </>
  );
}

NavVerticalGroup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    isAuthorized: PropTypes.func,
    profiles: PropTypes.array,
    children: PropTypes.array,
  }),
};
NavVerticalGroup.defaultProps = {};

export default NavVerticalGroup;
