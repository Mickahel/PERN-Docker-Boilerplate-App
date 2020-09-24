import React, {useContext} from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Trans } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import "./style.scss";
import MenuItem from "@material-ui/core/MenuItem";
import i18n from "i18n";
import Select from "@material-ui/core/Select";
import { ThemeContext } from 'contexts/Providers/ThemeProvider'
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints";

function LanguageBox(props) {
  const themeContext = useContext(ThemeContext)
  const { fetch, data } = useFetch();
  const changeLanguage =  (e) => {
    i18n.changeLanguage(e.target.value, async(err, t) => {
      if (err) themeContext.showErrorNotification({message:<Trans>somethingWentWrong</Trans>})
      else {
        console.log(e.target.value)
        try {
          await fetch({
            url: Endpoints.user.editProfile,
            data: {
              language: e.target.value
            },
            method: "PUT",
          })
        } catch (e) {
  
        }
      }
    });
  };

  return (
    <div className="languageBox">
    <Card>
      <CardHeader title={<Trans>profile.language</Trans>} />
      <Divider />
      <CardContent className="flex flex-col">
        <div>
          <Trans>profile.preferredLanguageText</Trans>
        </div>
        <div className="mt-3 flex justify-center">
          <Select
            variant="outlined"
            id="languageSelect"
            value={localStorage.getItem("i18nextLng")}
            onChange={changeLanguage}
          >
            <MenuItem value={"it-IT"}>Italiano</MenuItem>
            <MenuItem value={"en-EN"}>English</MenuItem>
          </Select>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}

export default LanguageBox;
