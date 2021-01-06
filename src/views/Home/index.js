import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
//import { UserContext } from 'context/Providers/UserProvider';
import _ from "lodash";
function Home(props) {
  const history = useHistory();
  //  const userContext = useContext(UserContext);

  useEffect(() => {
    redirect()
  }, []);

  const redirect = () => {
    if (!_.isEmpty(localStorage.returnUrl)) {
      history.push(localStorage.returnUrl);
      localStorage.removeItem("returnUrl")
    } else history.push("/dashboard");
    /*    if (userContext.user) {
            history.push('/dashboard')
        } else {
            history.push('/auth/login')
        }*/
  };

  return <></>;
}

export default Home;
