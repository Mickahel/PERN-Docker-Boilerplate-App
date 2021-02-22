import React, { useEffect } from "react";
import "./style.scss";
import RoundLoader from "components/RoundLoader";
import PublicAppBar from "components/PublicAppBar";
import Typography from "@material-ui/core/Typography";
import config from "configuration/config";
import Helmet from "react-helmet";
import { Trans, useTranslation } from "react-i18next";
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import useFetch from "hooks/useFetch"
import Endpoints from "Endpoints"
function PrivacyPolicy(props) {
  const [t, i18n] = useTranslation();
  const { fetch, data, loading } = useFetch()
  const loadData = async () => {
    const t = await fetch({
      method: "GET",
      name: "privacyPolicy",
      url: Endpoints.generalSettings.getGeneralSetting,
      urlParams: {
        feature: "privacyPolicy"
      }
    })
  }
  useEffect(() => { loadData() }, [])
  if (loading) return <RoundLoader />
  return (
    <PublicAppBar title="Privacy Policy">
      <Helmet title={`${config.name.short} - Privacy Policy`} />
      <div id="privacyPolicy">
        <div dangerouslySetInnerHTML={{ __html: data.value }} className='documentation-content' />
      </div>
    </PublicAppBar>
  );
}

export default PrivacyPolicy;
