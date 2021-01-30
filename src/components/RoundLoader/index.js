import React, { useState, useRef, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./style.scss";
import { makeStyles } from "@material-ui/core/styles";
import config from "configuration/config";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    //border: `3px solid orangered`,
    border: `3px solid ${config.theme.roundLoader.color || config.palette.primaryColor}`,
    borderRadius: "50%",
    borderRightColor: "transparent",
    display: "inline-block",
    width: props.size || "50px",
    height: props.size || "50px",
    animation: `test 1s linear infinite`,
    animationDelay: `-${props.currTime}ms`,
  }),
  bgColor: {
    backgroundColor: localStorage.theme
      ? localStorage.theme == "light"
        ? "#fafafa"
        : "#303030"
      : theme.palette.type === "light"
        ? "#fafafa"
        : "#303030",
  }
}));


function RoundLoader(props) {
  const mountTime = useRef(Date.now() % 1000);
  const classes = useStyles({ size: props.size, currTime: mountTime.current, localStorageTheme: localStorage.theme });
  const { className } = props;

  return (
    <div
      className={classnames(
        className,
        classes.bgColor,
        //"flex flex-1 items-center justify-center w-full h-full"
      )}
    >
      <div className={classnames(
        classes.root,
        "circularProgressLoader"
      )} />
    </div>
  )
}

RoundLoader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

RoundLoader.defaultProps = {
  className: "",
};

export default RoundLoader;
