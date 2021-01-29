import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import _ from "lodash";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import i18n from "i18n";
import { Trans } from "react-i18next";
import PropTypes from "prop-types";
import classnames from "classnames";
import EnhancedTableHead from "./EnhancedTableHead";
import Row from "./Row";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import "./style.scss";
import TextField from "@material-ui/core/TextField";
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined';
function createRows(rowsToParse) {
  return rowsToParse
}

function descendingComparator(a, b, orderBy) {
  let aValueComparator = isNaN(a[orderBy]?.value)
    ? a[orderBy]?.value
    : parseFloat(a[orderBy]?.value);
  let bValueComparator = isNaN(b[orderBy]?.value)
    ? b[orderBy]?.value
    : parseFloat(b[orderBy]?.value);
  if (bValueComparator < aValueComparator) {
    return -1;
  }
  if (bValueComparator > aValueComparator) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function createHeadCells(headCells) {
  const enrichedHeadCells = headCells.map((element) => {
    return {
      ...element,
      label: <Trans>{element.label}</Trans>,
      show: true,
    };
  });
  return [...enrichedHeadCells];
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  table: {
    //minWidth: 750,
  },

  container: (props) => ({
    maxHeight: props.maxHeight,
  }),

  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },

  highlight:
    theme.palette.type === "light"
      ? {
        //color: theme.palette.primary.main,
        backgroundColor:
          lighten(theme.palette.primary.light, 0.85) + "!important",
      }
      : {
        //color: theme.palette.text.primary,
        backgroundColor:
          lighten(theme.palette.primary.dark, 0.2) + "!important",
      },
}));

function EnhancedTable(props) {
  let {
    readOnly,
    showFilters,
    title,
    collapsible,
    collapsibleHeadCells,
    collapsibleTitle,
    stickyHeader,
    showHeadCells,
    showSearchbar,
    maxHeight,
    singlePage,
    dense,
    buttons,
    collapsibleType,
    collapsibleHeadIconsAndDescription
  } = props;

  const classes = useStyles({ maxHeight });
  const [order, setOrder] = useState("asc");
  // const [orderBy, setOrderBy] = React.useState('calories');
  const [orderBy, setOrderBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [headCells, setHeadCells] = useState(createHeadCells(props.headCells));
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);
  const history = useHistory();

  const handleCheckboxFilterClick = (event, elementId) => {
    let isAHeadCellVisible = false;
    let newHeadCells = [];
    headCells.map((element) => {
      let a = {
        ...element,
        show: element.id == elementId ? !element.show : element.show,
      };
      newHeadCells.push(a);
      if (a.show == true) isAHeadCellVisible = true;
      /*let a = element
      if (element.id == elementId) a.show = !Boolean(element.show);
      if(element.show==true) isAHeadCellVisible=true
      newHeadCells.push(a);*/
    });
    if (isAHeadCellVisible == true) setHeadCells(newHeadCells);
  };

  const handleSearch = (e) => {
    let searchedRows = [];
    plainRows.forEach((row) => {
      //per ogni riga
      let containsTheWord = false;
      Object.keys(row).forEach(function (key) {
        if (key != "id" && key != "collapsible") {
          if (
            !(typeof row[key].value === "boolean") &&
            (row[key].value + (row[key]?.symbol ? row[key].symbol : ""))
              .toString()
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ) {
            containsTheWord = true;
          }
        }
      });
      if (containsTheWord) searchedRows.push(row);
    });
    //e.target.value!="" ? setRows(searchedRows) : setRows(plainRows)
    setRows(searchedRows);
  };

  let plainRows = createRows(props.rows);

  //useEffect(() => setRows(createRows(props.rows)), []);

  useEffect(() => setRows(createRows(props.rows)), [props.rows])


  const createRowsPerPageOptions = (rows) => {
    let rowsPerPageOptions = [];
    rowsPerPageOptions.push(props.rowsPerPage)
    if (rows.length >= 5) rowsPerPageOptions.push(5);
    if (rows.length >= 10) rowsPerPageOptions.push(10);
    if (rows.length >= 25) rowsPerPageOptions.push(25);

    return [...new Set(rowsPerPageOptions)].sort((a, b) => a - b);
  };

  const handleRequestSort = (event, property) => {

    const isAsc = orderBy === property && order === "asc";
    const isDesc = orderBy === property && order === "desc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(isDesc ? "" : property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    event.preventDefault();
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const rowsToShow = () => {
    let stableSortedRows = stableSort(rows, getComparator(order, orderBy));
    if (singlePage) return stableSortedRows;
    return stableSortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  };
  return (
    <div className={classnames(classes.root, "enhancedTable")}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        buttons={buttons}
        title={title}
        selected={selected}
        handleSearch={handleSearch}
        headCells={headCells}
        handleCheckboxFilterClick={handleCheckboxFilterClick}
        showFilters={showFilters}
        showSearchbar={showSearchbar}
        readOnly={readOnly}
      />
      <TableContainer className={props.maxHeight && classes.container}>
        <Table
          style={{ tableLayout: "auto" }}
          className={classes.table}
          stickyHeader={stickyHeader}
        >
          {showHeadCells && (
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
              readOnly={readOnly}
              collapsible={collapsible}
              dense={dense}
            />
          )}
          <TableBody>
            {rowsToShow().map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <Row
                  collapsibleType={collapsibleType}
                  collapsibleHeadIconsAndDescription={collapsibleHeadIconsAndDescription}
                  labelId={labelId}
                  classes={classes}
                  readOnly={readOnly}
                  row={row}
                  index={index}
                  handleClick={handleClick}
                  headCells={headCells}
                  isItemSelected={isItemSelected}
                  collapsible={collapsible}
                  key={index}
                  activeCells={headCells.length}
                  collapsibleHeadCells={collapsibleHeadCells}
                  collapsibleTitle={collapsibleTitle}
                  dense={dense}
                />
              );
            })}
            {emptyRows > 0 && (

              <TableRow style={{ height: (dense == true ? 25 : 55.5) * emptyRows }}>
                {!readOnly && <TableCell padding={dense ? "none" : "default"} />}
                {collapsible && <TableCell padding={dense ? "none" : "default"} />}
                {headCells.map((element, index) => {
                  if (element.show == true) return <TableCell key={index} padding={dense ? "none" : "default"} />;
                })}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!singlePage && (<>
        {/*<div className="pages"><MenuBookOutlinedIcon fontSize="small"/> 
        <TextField type="number" size="small" id="filled-basic" label={<Trans>enhancedTable.page</Trans>} variant="filled" /></div>
        */}<TablePagination
          backIconButtonText={i18n.t("enhancedTable.previousPage")}
          nextIconButtonText={i18n.t("enhancedTable.nextPage")}
          labelRowsPerPage={i18n.t("enhancedTable.rows")}
          rowsPerPageOptions={createRowsPerPageOptions(rows)}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            color: "primary",
          }}
          nextIconButtonProps={{
            color: "primary",
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return `${from}-${to} ${i18n.t("enhancedTable.of")} ${count !== -1 ? count : `${i18n.t("enhancedTable.moreThan")} ${to}`
              }`;
          }}
        /></>
      )}
    </div>
  );
}

EnhancedTable.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  buttons: PropTypes.array,
  readOnly: PropTypes.bool,
  showFilters: PropTypes.bool,
  showSearchbar: PropTypes.bool,
  rowsPerPage: PropTypes.number,
  singlePage: PropTypes.bool,
  maxHeight: PropTypes.number,
  dense: PropTypes.bool,
  collapsible: PropTypes.bool,
  collapsibleTitle: PropTypes.string,
  collapsibleHeadCells: PropTypes.array,
  collapsibleHeadIconsAndDescription: PropTypes.array,
  collapsibleType: PropTypes.oneOf(["TABLE", "INFORMATION"])
};
EnhancedTable.defaultProps = {
  title: "",
  readOnly: false,
  showFilters: true,
  rowsPerPage: 5,
  showHeadCells: true,
  showSearchbar: true,
  singlePage: false,
  dense: false,
  collapsible: false,
  collapsibleType: "TABLE",
  buttons: []
};

export default EnhancedTable;
