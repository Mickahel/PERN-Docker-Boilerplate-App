import React, { useContext,useCallback, useEffect } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import "./style.scss";
import LanguageBox from "./LanguageBox";
import ProfileBox from "./ProfileBox";
import ChangePasswordBox from "./ChangePasswordBox";
import Endpoints from "Endpoints";
import RoundLoader from "components/RoundLoader";
import _ from 'lodash'  
function Profile(props) {
  const themeContext = useContext(ThemeContext);
  
  useEffect(() => {
    themeContext.setTitle("profile");
  }, []);

  //let activeSubscription = data.subscriptions.find((subscription) => { return subscription.active = true })
  return (
    <div className="profile flex flex-col">
      {/*<div className="flex flex-row justify-between topBox ">
        <span id="profileBox" className="w-3/6">
          <ProfileBox countries={data.countries} userState={data.state} />
        </span>
        
        <span className="flex flex-col w-3/6 rightBoxes">
          <span className="flex flex-row CPLBox">
            <span id="changePasswordBox" className="">
              <ChangePasswordBox />
            </span>
            <span id="languageBox" className="">
              <LanguageBox />
            </span>
          </span>
          {activeSubscription &&
            <span id="subscriptionBox">
              <SubscriptionBox subscription={activeSubscription} />
            </span>
          }
        </span>
      </div>

      <div className="flex flex-row justify-between">
      <span className="flex w-3/6 paymentMethodBox">
          <PaymentMethodBox />
          </span>


        {data.payments &&
          <span id="paymentsBox">
            <PaymentsBox />
          </span>}
        </div>}*/}
    </div>
  );
}
export default Profile;
