import React from "react";
import "./style.scss";
import PublicAppBar from "components/PublicAppBar";
import Typography from "@material-ui/core/Typography";
import config from "configuration/config";
import Helmet from "react-helmet";
import { Trans, useTranslation } from "react-i18next";
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
function PrivacyPolicy(props) {
  const [t, i18n] = useTranslation();
  return (
    <PublicAppBar title="Privacy Policy">
      <Helmet title={`${config.name.short} - Privacy Policy`} />
      <div id="privacyPolicy">
        <Typography variant="h4" gutterBottom>
          Information on the processing of personal data of website users
        </Typography>
        <Typography variant="body2" gutterBottom>
          Pursuant to Article 13 of Regulation (EU) 2016/679
          Why this information
          Pursuant to Regulation (EU) 2016/679 (hereinafter "Regulation"), this page describes the methods for processing the personal data of users who consult the websites of the platform accessible electronically at the following addresses:
          • www.test.com
          This information does not concern other sites, pages or online services that can be reached via hypertext links published on the sites but referring to resources outside the domain.
          Following consultation of the sites listed above, data relating to identified or identifiable natural persons may be processed.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Holder of the treatment
        </Typography>
        <Typography variant="body2" gutterBottom>
          The data controller is Test, with registered office in Test (test@test.com; Tel: +00 000 0000 000).
        </Typography>
        <Typography variant="h5" gutterBottom>
          Data Protection Officer
        </Typography>
        <Typography variant="body2" gutterBottom>
          The Data Protection Officer (DPO) reachable at the following address: Test, or at the Test address.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Types of data processed and purposes of the processing
        </Typography>
        <Typography variant="body2" gutterBottom>
          Navigation data
          The computer systems and software procedures used to operate this site acquire, during their normal operation, some personal data whose transmission is implicit in the use of Internet communication protocols.
          This category of data includes the following:
        <ul>
            <li>
              • IP addresses of the devices used by users;
        </li>
            <li>
              • date and time in which the request was received;
        </li>
            <li>
              • the URI / URL (Uniform Resource Identifier / Locator) addresses of the requested resources;
        </li>
            <li>
              • the numerical code indicating the status of the response given by the server (successful, error, etc.);
        </li>
            <li>
              • the size of the response in bytes;
        </li>
            <li>
              • URI / URL address of the page of origin (referrer);
        </li>
            <li>
              • browser recognition string (user agent).
        </li>
          </ul>
        These data do not persist for more than 15 days, after which they are automatically deleted (except for any need to ascertain crimes by the judicial authorities).
        Furthermore, data necessary for the use of web services are processed anonymously, in order to check the correct functioning of the services offered.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Cookies and other tracking systems
        </Typography>
        <Typography variant="body2" gutterBottom>
          We do not use cookies for user profiling, nor use other tracking methods.
          Instead, session cookies (non-persistent) are used strictly limited to what is necessary for the safe and efficient navigation of the sites. Only on some pages of the sites are technical cookies used which remain even after the browser is closed and which are not, in any case, used to track navigation and the user.
          The storage of technical cookies in terminals or browsers is under the user's control. The information relating to the cookies saved on the servers at the end of the HTTP sessions, remain recorded in the service logs, with retention times not exceeding 15 days, like the other navigation data.
          Rights of interested parties
          Users, in their capacity as interested parties, have the right to obtain, in the cases provided for, access to personal data and the correction or cancellation of the same or the limitation of the processing that concerns them or to oppose the processing. The specific request is presented by contacting the TEST.
          Interested parties can also oppose the registration of cookies on their hard disk by configuring the navigation browser to disable them.
          Below are the links where you can find information on the methods offered by the main browsers:
          <ul>
            <li>
              • <a href="http://windows.microsoft.com/it-it/windows7/how-to-manage-cookies-in-internet-explorer-9">Internet Explorer<LinkOutlinedIcon fontSize="small" /></a>
            </li>
            <li>
              • <a href="https://support.google.com/chrome/answer/95647?hl=it">Chrome<LinkOutlinedIcon fontSize="small" /></a>
            </li>
            <li>
              • <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie">Firefox<LinkOutlinedIcon fontSize="small" /></a>
            </li>
            <li>
              • <a href="http://support.apple.com/kb/HT1677?viewlocale=it_IT">Safari<LinkOutlinedIcon fontSize="small" /></a>
            </li>
          </ul>
          After this operation, however, some functions of the web pages may not be performed correctly.
        </Typography>
        <Typography variant="h5" gutterBottom>
          Right to complain
          </Typography>
        <Typography variant="body2" gutterBottom>
          Interested parties, who believe that the processing of personal data referring to them carried out through this site is in violation of the provisions of the Regulation, have the right to lodge a complaint with the Guarantor for the protection of personal data, as required by art. 77 of the Regulation itself, or to take the appropriate judicial offices (Article 79 of the Regulation)
        </Typography>
      </div>
    </PublicAppBar>
  );
}

export default PrivacyPolicy;
