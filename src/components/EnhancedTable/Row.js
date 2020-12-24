import React, { useEffect, useContext, useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import TableBody from "@material-ui/core/TableBody";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import TableHead from "@material-ui/core/TableHead";
import Table from "@material-ui/core/Table";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
const useRowStyles = makeStyles((theme) => ({
  tableCell: {
    borderTop: "unset",
    borderBottom: "unset",
  },
  rowColor: {
    backgroundColor: theme.palette.type == "light" ? "#FBFBFB" : "#666666",
  },
  root: {
    "& > *": {
      borderTop: "unset",
      borderBottom: "unset",
    },
  },
}));

const createTableCell = (element) => {
  let value;
  if (typeof element.value === "boolean") {
    value =
      element.value === true ? (
        <CheckCircleOutlinedIcon className="trueIcon" />
      ) : (
        <CancelOutlinedIcon className="falseIcon" />
      );
  } else value = element.value;

  let renderedElement = (
    <span className="singleCell">
      <span className="singleCellText">
        {value}
        {element.symbol}
      </span>

      {element.link && (
        <span className="singleCellIcon">
          <IconButton
            onClick={() => {
              window.open(element.link);
            }}
            className="linkIconButton"
          >
            <ChevronRightOutlinedIcon />
          </IconButton>
        </span>
      )}
    </span>
  );
  return renderedElement;
};

function Row(props) {
  const {
    readOnly,
    classes,
    activeCells,
    index,
    row,
    handleClick,
    isItemSelected,
    headCells,
    labelId,
    collapsible,
    collapsibleHeadCells,
    collapsibleTitle,
    showVerticalBorders,
  } = props;

  const themeContext = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  const rowClasses = useRowStyles({ showVerticalBorders });

  return (
    <>
      <TableRow
        classes={{
          selected: classes.highlight,
        }}
        className={classnames(
          collapsible && rowClasses.root,
          index % 2 == 0 && rowClasses.rowColor
        )}
        hover
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={index}
        selected={isItemSelected}
      >
        {!readOnly && (
          <TableCell size="small" padding="checkbox">
            <Checkbox
              onClick={readOnly ? null : (event) => handleClick(event, row.id)}
              color="primary"
              checked={isItemSelected}
              inputProps={{ "aria-labelledby": labelId }}
            />
          </TableCell>
        )}

        {collapsible && (
          <TableCell>
            <IconButton
              size="small"
              onClick={(e) => {
                e.preventDefault();
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {headCells.map((element, index) => {
          return (
            element.show && (
              <TableCell
                key={row[element.id].value + index + element.id}
                align={index == 0 ? "inherit" : "center"}
                className={classnames(
                  row[element.id].link && index != 0 && "iconPadding"
                )}
              >
                {createTableCell(row[element.id])}
              </TableCell>
            )
          );
        })}
      </TableRow>
      {collapsible && (
        <TableRow>
          <TableCell
            style={{ paddingTop: 0, paddingBottom: 0 }}
            colSpan={activeCells + (readOnly ? 1 : 2)}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom>
                  <span className="font-semibold">{collapsibleTitle}</span>
                </Typography>
                <span className="collapsibleTable">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        {collapsibleHeadCells.map((element, index) => {
                          return (
                            <TableCell
                              key={index}
                              align={index == 0 ? "left" : "center"}
                            >
                              <span className="font-semibold">
                                {element.label}
                              </span>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {collapsible &&
                        row.collapsible.map(
                          (collapsibleRow, collapsibleIndex) => {
                            return (
                              <TableRow key={collapsibleIndex}>
                                {collapsibleHeadCells.map(
                                  (
                                    collapsibleHeadCell,
                                    collapsibleHeadcellIndex
                                  ) => {
                                    return (
                                      <TableCell
                                        key={
                                          collapsibleRow[collapsibleHeadCell.id]
                                            .value +
                                          collapsibleIndex +
                                          collapsibleHeadcellIndex
                                        }
                                        align={
                                          collapsibleHeadcellIndex == 0
                                            ? "left"
                                            : "center"
                                        }
                                      >
                                        {createTableCell(
                                          collapsibleRow[collapsibleHeadCell.id]
                                        )}
                                      </TableCell>
                                    );
                                  }
                                )}
                              </TableRow>
                            );
                          }
                        )}
                    </TableBody>
                  </Table>
                </span>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default Row;
