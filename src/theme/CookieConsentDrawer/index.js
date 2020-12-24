import React, { useState } from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { Trans } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import "./style.scss";
import { getCookie, setCookie } from "auxiliaries/cookies";
function CookieConsentDrawer(props) {
  const [cookieConsentOpen, setCookieConsentOpen] = useState(
    !getCookie("acceptedCookies")
  );
  const createAcceptCookieConsent = () => {
    setCookie("acceptedCookies", true, 356 * 60);
    setCookieConsentOpen(false);
  };

  return (
    <Drawer variant="persistent" anchor="bottom" open={cookieConsentOpen}>
      <div className="flex justify-center mt-4 mb-4 ml-2 mr-2 items-center">
        <div>
          <Typography variant="body2">
            <Trans>cookieConsentDrawer.text</Trans>
            <Link href="/privacy-policy">Privacy Policy</Link>
          </Typography>
        </div>
        <span className="flex" id="cookie-consent-buttons">
          {/*<div className="ml-3 mr-3">
                    <Button size="small"><Trans>cookieConsentDrawer.reject</Trans></Button>
                </div>*/}
          <div className="ml-2 mr-2">
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={createAcceptCookieConsent}
            >
              <Trans>cookieConsentDrawer.ok</Trans>
            </Button>
          </div>
        </span>
      </div>
    </Drawer>
  );
}
export default CookieConsentDrawer;
