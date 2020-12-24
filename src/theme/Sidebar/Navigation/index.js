import React, { useContext } from "react";
import NavVerticalGroup from "./NavVerticalGroup";
import NavVerticalCollapse from "./NavVerticalCollapse";
import NavVerticalItem from "./NavVerticalItem";
import { Divider, List } from "@material-ui/core";
import PropTypes from "prop-types";
import SidebarMenu from "configuration/SidebarMenu";
import { ThemeContext } from "contexts/Providers/ThemeProvider";

function Navigation(props) {
  const themeContext = useContext(ThemeContext);
  const { navigation } = props;
  if (!navigation) return null;
  return (
    <List>
      {navigation.map((item) => (
        <React.Fragment key={item.id}>
          {item.type === "group" && (
            <NavVerticalGroup item={item} nestedLevel={0} />
          )}

          {item.type === "collapse" && (
            <NavVerticalCollapse item={item} nestedLevel={0} />
          )}

          {item.type === "item" && (
            <NavVerticalItem item={item} nestedLevel={0} />
          )}

          {item.type === "divider" && (
            <Divider
              variant={themeContext.sidebarOpen ? "middle" : "fullWidth"}
            />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}

Navigation.propTypes = {
  navigation: PropTypes.array.isRequired,
};

Navigation.defaultProps = {
  navigation: SidebarMenu,
};

export default Navigation;
