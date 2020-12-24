import React from "react";
import "./style.scss";
import Typography from "@material-ui/core/Typography";
import PublicAppBar from "components/PublicAppBar";
import config from "configuration/config";
import Helmet from "react-helmet";
import { Trans, useTranslation } from "react-i18next";

function TermsOfService(props) {
  const [t, i18n] = useTranslation();
  return (
    <PublicAppBar title="tos.termsOfService">
      <Helmet title={`${config.name.short} - ${t("tos.termsOfService")}`} />
      <div id="termsOfService">
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
          tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint obcaecat cupiditat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
          consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur. Quis aute iure reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur. Quis aute iure reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit,
          sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint obcaecat cupiditat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
          consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur. Quis aute iure reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur. Quis aute iure reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit,
          sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint obcaecat cupiditat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
          consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur. Quis aute iure reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur. Quis aute iure reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit,
          sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint obcaecat cupiditat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
          consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur. Quis aute iure reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur. Quis aute iure reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit,
          sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint obcaecat cupiditat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
          consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur. Quis aute iure reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur. Quis aute iure reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit,
          sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint obcaecat cupiditat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
          consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur. Quis aute iure reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur. Quis aute iure reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit,
          sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint obcaecat cupiditat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
          consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur. Quis aute iure reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur. Quis aute iure reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit,
          sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint obcaecat cupiditat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
          consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur. Quis aute iure reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam
          corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
          consequatur. Quis aute iure reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat
          cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
          id est laborum. Lorem ipsum dolor sit amet, consectetur adipisci elit,
          sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrum exercitationem ullam corporis suscipit
          laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
          aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint obcaecat cupiditat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </Typography>
      </div>
    </PublicAppBar>
  );
}

export default TermsOfService;
