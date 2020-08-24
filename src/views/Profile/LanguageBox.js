import React, {useContext} from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Trans } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import "./style.scss";
import MenuItem from "@material-ui/core/MenuItem";
import i18n from "i18n";
import Select from "@material-ui/core/Select";
import { ThemeContext } from 'contexts/Providers/ThemeProvider'

function LanguageBox(props) {
  const themeContext = useContext(ThemeContext)
  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value, (err, t) => {
      if (err) themeContext.showErrorNotification({message:"somethingWentWrong"})
    });
  };

  return (
    <Card id="language" >
      <CardHeader title={<Trans>language</Trans>} />
      <Divider />
      <CardContent className="flex flex-col">
        <div>
          <Trans>preferredLanguageText</Trans>
        </div>
        <div className="mt-3 flex justify-center">
          <Select
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
  );
}

export default LanguageBox;
