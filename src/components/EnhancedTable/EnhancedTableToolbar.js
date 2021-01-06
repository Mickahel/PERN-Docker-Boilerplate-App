import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { lighten, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Trans } from "react-i18next";
import FilterListIcon from "@material-ui/icons/FilterList";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

const useToolbarStyles = makeStyles((theme) => ({
  root: (props) => ({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    minHeight: props.setMinHeight ? "90px !important" : "10px !important",
  }),
  highlight:
    theme.palette.type === "light"
      ? {
        //color: theme.palette.primary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.85),
      }
      : {
        //color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark,
      },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    handleEditClick,
    handleDeleteClick,
    handleSearch,
    headCells,
    handleCheckboxFilterClick,
    showFilters,
    showSearchbar,
    readOnly,
  } = props;
  let setMinHeight = !(showFilters || showSearchbar || readOnly);
  const classes = useToolbarStyles(setMinHeight);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      className={classnames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}
          {numSelected === 1 ? (
            <Trans>enhancedTable.elementSelected</Trans>
          ) : (
              <Trans>enhancedTable.elementsSelected</Trans>
            )}
        </Typography>
      ) : (
          <>
            {showSearchbar && (
              <TextField
                size="small"
                onChange={(e) => {
                  handleSearch(e);
                }}
                label={<Trans>enhancedTable.search</Trans>}
              />
            )}
          </>
        )}

      {numSelected === 0 && showFilters && (
        <>
          <Tooltip title={<Trans>enhancedTable.filtersList</Trans>}>
            <IconButton onClick={handleFilterClick} aria-label="filter list">
              <FilterListIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            {headCells.map((element, index) => {
              return (
                <MenuItem
                  key={"check" + element.id + index}
                  onClick={(e) => handleCheckboxFilterClick(e, element.id)}
                >
                  <Checkbox color="primary" checked={element.show} />
                  {element.label}
                </MenuItem>
              );
            })}
          </Menu>
        </>
      )}
      {numSelected > 0 && (
        <Tooltip title={<Trans>enhancedTable.delete</Trans>}>
          <IconButton onClick={handleDeleteClick} aria-label="delete">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
      {numSelected === 1 && (
        <Tooltip title={<Trans>enhancedTable.edit</Trans>}>
          <IconButton onClick={handleEditClick} aria-label="edit">
            <EditOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  headCells: PropTypes.array.isRequired,
  handleCheckboxFilterClick: PropTypes.func.isRequired,
  showFilters: PropTypes.bool.isRequired,
};

export default EnhancedTableToolbar;
