import React, { useEffect, useCallback, useContext, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
//import ErrorNotFound from 'views/Placeholders/ErrorNotFound'
//import Dashboard from 'views/Dashboard'
import {ThemeContext} from 'contexts/Providers/ThemeProvider'
//import Header from '../theme/Header'
//import Sidebar from 'theme/Sidebar'
//import Account from './Account'
import Home from 'views/Home'
import Dashboard from 'views/Dashboard'
import About from 'views/About'
import Team from 'views/Team'
//import { isUserTokenValid, removeUserToken } from 'auxiliaries/AuthAuxiliaries'
//import { UserContext } from 'context/Providers/UserProvider'
import Endpoints from 'Endpoints'
import "../sass/main.scss"
import RoundLoader from 'components/RoundLoader'
import useFetcher from 'hooks/useFetcher'
import { useHistory } from 'react-router-dom'
import { browserHistory } from 'react-router'

function App(props) {
    const themeContext = useContext(ThemeContext)
//    const userContext = useContext(UserContext)
    const history = useHistory()

    const pushToLogin =useCallback(() => {
        //removeUserToken()
        props.history.push('/auth/login?returnUrl=' + props.location.pathname)
    }, [])

    return (
        <div className="main-theme">
            {/*<Sidebar>
                <Header />*/}
                <div className="contentHeight">
                    <Switch >
                        <Route exact path='/about' component={About} />
                        <Route exact path='/team' component={Team} />
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/' component={Home} />
                        {/*<Route component={ErrorNotFound} />*/}
                    </Switch>
                </div>
            {/*</Sidebar>*/}


        </div>
    )
}

export default App