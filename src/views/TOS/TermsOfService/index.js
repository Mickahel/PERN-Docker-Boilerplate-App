import React, { useEffect } from "react";
import "./style.scss";
import Typography from "@material-ui/core/Typography";
import PublicAppBar from "components/PublicAppBar";
import config from "configuration/config";
import Helmet from "react-helmet";
import { Trans, useTranslation } from "react-i18next";
import useFetch from "hooks/useFetch"
import Endpoints from "Endpoints"
import RoundLoader from "components/RoundLoader";
function TermsOfService(props) {
  const [t, i18n] = useTranslation();
  const { fetch, data, loading } = useFetch()
  const loadData = async () => {
    const t = await fetch({
      method: "GET",
      name: "privacyPolicy",
      url: Endpoints.generalSettings.getGeneralSetting,
      urlParams: {
        feature: "termsOfService"
      }
    })
  }
  useEffect(() => { loadData() }, [])
  if (loading) return <RoundLoader />
  return (
    <PublicAppBar title="tos.termsOfService">
      <Helmet title={`${config.name.short} - ${t("tos.termsOfService")}`} />
      <div id="termsOfService">
        <div dangerouslySetInnerHTML={{ __html: data.value }} className='documentation-content' />

      </div>
    </PublicAppBar>
  );
}

export default TermsOfService;
