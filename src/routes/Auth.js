import React,{lazy} from 'react'
import {Route, Switch} from 'react-router-dom'
//Auth Components
import PublicTemplate from 'components/PublicTemplate'

const Login            =lazy(()=>import('views/Auth/Login')) 
const RemindPassword   =lazy(()=>import('views/Auth/RemindPassword')) 
const RestorePassword  =lazy(()=>import('views/Auth/RestorePassword')) 

function Auth(props){
    return(
            <PublicTemplate>
                <Switch>
                    <Route path = "/auth/login"             component={Login} /> 
                    <Route path = "/auth/password-remind"   component={RemindPassword} /> 
                    <Route path = "/auth/password-restore"  component={RestorePassword}/>
                    <Route path=  '/auth*'                  component={Login} />
                </Switch>
            </PublicTemplate>
    )
}

export default Auth