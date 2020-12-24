import React from "react";
import "./style.scss";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Trans } from "react-i18next";
const CentralDivider = ({ text, onClickFunction }) => {
  return (
    <div className="centralDivider">
      <div className="borderDivider" />
      <span className="contentDivider">
        {onClickFunction ? (
          <Button color="primary" onClick={onClickFunction}>
            <Trans>{text}</Trans>
          </Button>
        ) : (
          <Typography variant="button" color="primary" display="block">
            <Trans>{text}</Trans>
          </Typography>
        )}
      </span>
      <div className="borderDivider" />
    </div>
  );
};
export default CentralDivider;
