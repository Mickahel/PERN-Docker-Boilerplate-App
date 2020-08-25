import React, { lazy, useEffect, useCallback, useContext, useState, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { ThemeContext } from 'contexts/Providers/ThemeProvider'
import Theme from 'Theme'
import Account from './Account'
import { UserContext } from 'contexts/Providers/UserProvider'
import Endpoints from 'Endpoints'
import "../sass/main.scss"
import RoundLoader from 'components/RoundLoader'
import { useHistory } from 'react-router-dom'
import useFetch from 'hooks/useFetch'

const ErrorNotFound = lazy(() => import('views/Placeholders/ErrorNotFound'))
const Home = lazy(() => import('views/Home'))
const Dashboard = lazy(() => import('views/Dashboard'))

function App(props) {
    const themeContext = useContext(ThemeContext)
    const userContext = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    const {fetch} = useFetch()


    useEffect(() => {
        checkUserIdentity()
    }, [])

    const checkUserIdentity = useCallback(async () => {
        if (userContext.user) {
            setLoading(false)
            return
        }
        // ? qui non ho l'utente
        try{
         const data = await fetch({
                method: "GET",
                url: Endpoints.user.profile,
            })
            userContext.setUser(data)
            setLoading(false)
        } catch(e){
            //themeContext.showWarningNotification({ message: "loginAgain" })
            //console.log("BBB",history.location.pathname)
            //history.push("auth?returnUrl=" + history.location.pathname)
        }
    }, [])


    if (loading) return <RoundLoader />
    return (
        <Theme>
            <Suspense fallback={<RoundLoader agent="suspense in app"/>}>
                <Switch >
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route path='/account*' exact component={Account} />
                    <Route exact path='/' component={Home} />
                    <Route component={ErrorNotFound} />
                </Switch>
            </Suspense>
        </Theme>
    )
}

export default App