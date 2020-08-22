import React, { useState, useContext} from 'react';
import config from 'configuration/config'
import Helmet from 'react-helmet';
import { t } from 'i18next';
import { Trans } from 'react-i18next'
import "./style.scss"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import * as Yup from 'yup';
import useFetch from 'hooks/useFetch'
import Endpoints from 'Endpoints';
import { ThemeContext } from 'contexts/Providers/ThemeProvider';
import { UserContext } from 'contexts/Providers/UserProvider';

function Login(props) {
    let history = useHistory();
    const themeContext = useContext(ThemeContext)
    const userContext = useContext(UserContext)
    const {fetch,loading, error} = useFetch()
    const pushInsideApp = () => {
        const usp = new URLSearchParams(props.location.search)
        const returnUrl = usp.get('returnUrl')
        if (returnUrl) history.push(returnUrl)
        else history.push('/')
    }

    return (

        <div id="activation">

            <Helmet title={`${config.name.short} - ${t("auth.activation")}`} />

            <div id="loginForm">

                <img width="300px" className='mb-5' src={process.env.PUBLIC_URL + '/img/logos/longLogo.svg'} alt='Main logo' />
                <Typography align="center" variant="h3" gutterBottom>
                    <Trans>auth.activation</Trans>
                </Typography>

            </div>
        </div>
    )
}

export default Login