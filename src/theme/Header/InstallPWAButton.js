import React, { useState, useContext } from "react";
import { PWAInstalledChecker, installApp } from "auxiliaries/PWA";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { Trans } from "react-i18next";
import Button from "@material-ui/core/Button";
import classnames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import GetAppOutlinedIcon from "@material-ui/icons/GetAppOutlined";
function InstallPWAButton(props) {
  let [showButton, setShowButton] = useState(true);

  const themeContext = useContext(ThemeContext);
  //console.log('PWAInstalledChecker()', PWAInstalledChecker())
  //console.log('themeContext.installEvent',themeContext.installEvent)
  if (showButton && !PWAInstalledChecker() && themeContext.installEvent) {
    return (
      <div id="install-app">
        <MenuItem
          dense={true}
          className="install-button"
          onClick={async () => {
            setShowButton(false);
            let result = await installApp(themeContext.installEvent);
            setShowButton(result);
          }}
        >
          <span className="menuItem">
            <GetAppOutlinedIcon
              className="menuProfileIcon"
              color="action"
              fontSize="small"
            />
            <Typography color="textSecondary" variant="body2" gutterBottom>
              <Trans>installApp</Trans>
            </Typography>
          </span>
        </MenuItem>
      </div>
    );
  } else return null;
}

export default InstallPWAButton;
