import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from "react";
import NavVerticalGroup from "./NavVerticalGroup";
import NavVerticalItem from "./NavVerticalItem";
import { Collapse, Icon, ListItem, ListItemText } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import NavBadge from "./NavBadge";
import PropTypes from "prop-types";
import { Trans } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import { useHistory } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: 23,
  },
  listItemIcon: (props) => ({
    minWidth: props.matches ? 35 : 50,
  }),
  collapseIcon: {
    opacity: 1,
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  collapseIconShift: {
    opacity: 0,
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  bigCollapseIcon: {
    opacity: 0,
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  bigCollapseIconShift: {
    opacity: 1,
    transition: theme.transitions.create(["opacity"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen * 3,
      delay: 300,
    }),
  },
}));
let isUrlInChildren = (parent, url) => {
  if (!parent.children) return false;
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].children && isUrlInChildren(parent.children[i], url))
      return true;
    if (
      parent.children[i].to === url ||
      ((!parent.children[i].exact || !parent.children[i].exact == false) && url.includes(parent.children[i].to))
    )
      return true;
  }
  return false;
};
function NavVerticalCollapse(props) {
  const themeContext = useContext(ThemeContext);
  const history = useHistory();
  let needsToBeOpened = useCallback(
    (item) =>
      history.location && isUrlInChildren(item, history.location.pathname),
    []
  );
  const [open, setOpen] = useState(needsToBeOpened(props));
  const styledClasses = useStyles();
  const ref = useRef();

  useEffect(() => {
    //if(open ==true){
    if (needsToBeOpened(props.item)) !ref.current && setOpen(true);
    else ref.current && setOpen(false);
    //}
    ref.current = open;
  }, [props.item]);

  let handleClick = () => setOpen((prevState) => !prevState);

  const { item, nestedLevel } = props;
  let paddingValue = nestedLevel * 3;
  const listItemPadding =
    nestedLevel > 0 ? "pl-" + (paddingValue > 80 ? 80 : paddingValue) : "";
  return (
    <div className={classNames(open && "open")}>
      <ListItem
        button
        onClick={handleClick}
        className={classNames(styledClasses.listItem, "list-item")}
      >
        <ListItemIcon classes={{ root: styledClasses.listItemIcon }}>
          <span className="list-item-icon text-16 flex-no-shrink mr-2">
            <span className={classNames(listItemPadding)}>
              {item.icon}
              <span
                className={classNames(styledClasses.collapseIcon, {
                  [styledClasses.collapseIconShift]: themeContext.sidebarOpen,
                })}
              >
                {open ? (
                  <ExpandLessOutlinedIcon fontSize="small" />
                ) : (
                    <ExpandMoreOutlinedIcon fontSize="small" />
                  )}
              </span>
            </span>
          </span>
        </ListItemIcon>
        <ListItemText
          className="list-item-text"
          primary={
            <Typography variant="body2">
              <Trans>{item.id}</Trans>
            </Typography>
          }
          classes={{ primary: "text-14" }}
        />
        {item.badge && <NavBadge className="mr-4" badge={item.badge} />}
        <Icon
          className={classNames(
            "w-32  p-0 flex",
            styledClasses.bigCollapseIcon,
            {
              [styledClasses.bigCollapseIconShift]: themeContext.sidebarOpen,
            }
          )}
        >
          {open ? (
            <ExpandLessOutlinedIcon color="action" />
          ) : (
              <ExpandMoreOutlinedIcon color="action" />
            )}
        </Icon>
      </ListItem>

      {item.children && (
        <Collapse in={open} className="collapse-children">
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
        </Collapse>
      )}
    </div>
  );
}

NavVerticalCollapse.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    children: PropTypes.array,
  }),
};

export default NavVerticalCollapse;
