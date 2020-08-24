import React, { useContext, useCallback, useEffect } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import "./style.scss";
import LanguageBox from "./LanguageBox";
import ProfileBox from "./ProfileBox";
import ChangePasswordBox from "./ChangePasswordBox";
import _ from 'lodash'
function Profile(props) {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    themeContext.setTitle("profile.profile");
  }, []);

  return (
    <div className="profile flex flex-col">
        <span id="profileBox" className="w-3/6">
          <ProfileBox />
        </span>

        <span className="flex flex-col w-3/6 rightBoxes">
          <span id="changePasswordBox">
            <ChangePasswordBox />
          </span>
          <span id="languageBox">
            <LanguageBox />
          </span>
        </span>
      </div>
  );
}
export default Profile;
