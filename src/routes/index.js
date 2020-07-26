import React,{useEffect, useContext} from 'react'
import { Route, Switch  } from 'react-router-dom'
//import Home from 'views/Home'
import RoutingApp from './App'
//import ErrorNotFound from 'views/Placeholders/ErrorNotFound'
//import PrivacyPolicy from 'views/TOS/PrivacyPolicy'
//import TermsOfService from 'views/TOS/TermsOfService'
//import Debug from 'views/Debug'
//import ErrorInternalServer from 'views/ErrorInternalServer'
import { ThemeContext } from 'contexts/Providers/ThemeProvider'
//import ErrorInternalServer from 'views/Placeholders/ErrorInternalServer'
//import ErrorNotAuthorized from 'views/Placeholders/ErrorNotAuthorized'
//import RoutingAuth from './Auth'
import i18n from 'i18n'
import moment from 'moment';

function App(props){
    

    const themeContext = useContext(ThemeContext)

/*    useEffect(() => {
        window.addEventListener('app-update', onAppUpdate)
        window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      }, [])
    
    const onBeforeInstallPrompt = e =>{
        if(!e)  return

        e.preventDefault();
        themeContext.setInstallEvent(e)
    }


    const onAppUpdate = () =>{
      let format = "YYYY-MM-DD HH:mm:ss"
      if(localStorage.updateDialogLastShown){
        let date = moment(localStorage.updateDialogLastShown, format)
        if(moment().diff(date, "minute")<1) return
      }
      
      localStorage.updateDialogLastShown = moment().format(format)
      themeContext.showInfoDialog({
        title: i18n.t("newUpdateAlert.title"),
        message: i18n.t("newUpdateAlert.message"),
        onClose:()=>{
          window.location.reload(true)
        }
      })
    }
*/

    return (
    <Switch>
      {/*<Route path='/terms-of-service' component={TermsOfService} />
      {process.env.NODE_ENV!="production" && <Route path='/debug' component={Debug} />}
      <Route path='/privacy-policy' component={PrivacyPolicy} />
      <Route path="/error/404" component={ErrorNotFound} />
      <Route path="/error/401" component={ErrorNotAuthorized} />
      <Route path="/error/403" component={ErrorNotAuthorized} />
      <Route path="/error/500" component={ErrorInternalServer} />
    <Route path='/auth*' component={RoutingAuth} />*/}
      <Route path='/*' component={RoutingApp} />

      {/*<Route component={ErrorNotFound} />*/}
  </Switch>
);


}

export default App;