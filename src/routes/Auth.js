import React,{lazy} from 'react'
import {Route, Switch} from 'react-router-dom'
//Auth Components
import PublicTemplate from 'components/PublicTemplate'

const Activation       =lazy(()=>import('views/Auth/Activation')) 
const Login            =lazy(()=>import('views/Auth/Login')) 
const Signup           =lazy(()=>import('views/Auth/Signup')) 
const RestorePassword  =lazy(()=>import('views/Auth/RestorePassword')) 

function Auth(props){
    return(
            <PublicTemplate>
                <Switch>
                    <Route path = "/auth/login"                     component={Login} /> 
                    <Route path = "/auth/signup"                    component={Signup} /> 
                    <Route path = "/auth/activate/:activationCode"  component={Activation} /> 
                    <Route path = "/auth/restore-password"          component={RestorePassword}/>
                    <Route path=  '/auth*'                          component={Login} />
                </Switch>
            </PublicTemplate>
    )
}

export default Auth