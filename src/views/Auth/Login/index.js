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
    let [disableButton, setDisableButton] = useState(true)
    let [showPassword, setShowPassword] = useState(false);
    const themeContext = useContext(ThemeContext)
    const userContext = useContext(UserContext)
    const {fetch} = useFetch()
    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    });

    const pushInsideApp = () => {
        const usp = new URLSearchParams(props.location.search)
        const returnUrl = usp.get('returnUrl')
        if (returnUrl) history.push(returnUrl)
        else history.push('/')
    }

    const loginFormik = useFormik({
        initialValues: {
            email: '',
            password: '',

        },
        onSubmit: async (values, formikBag) => {
            let data = await fetch({
                url: Endpoints.auth.login,
                data: values,
                method: "POST",
            })

            console.log(data)
            userContext.setUser(data)
            pushInsideApp()
        },
        validationSchema,
        validate: values => {
            validationSchema.isValid(values)
                .then(e => setDisableButton(!e))
        }
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (

        <div id="login">

            <Helmet title={`${config.name.short} - ${t("auth.login")}`} />

            <div id="loginForm">

                <img width="300px" className='mb-5' src={process.env.PUBLIC_URL + '/img/logos/longLogo.svg'} alt='Main logo' />
                <Typography align="center" variant="h3" gutterBottom>
                    <Trans>auth.login</Trans>
                </Typography>
                <div className="flex w-full justify-end">
                    <Chip
                        label={<Trans>auth.register</Trans>}
                        variant="outlined"
                        color="primary"
                        onClick={() => { window.open(config.name.link) }} />
                </div>
                {// ? FORM 
                }
                <form onSubmit={loginFormik.handleSubmit} className="mt-6">

                    <div id="formInputs">
                        <TextField
                            error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
                            id="email"
                            label={"Email"}
                            variant="filled"
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.email}
                            helperText={loginFormik.touched.email && <Trans>{loginFormik.errors.email}</Trans>}
                        />

                        <TextField
                            error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
                            variant="filled"
                            id='password'
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            onChange={loginFormik.handleChange}
                            onBlur={loginFormik.handleBlur}
                            value={loginFormik.values.password}
                            helperText={loginFormik.touched.password && <Trans>{loginFormik.errors.password}</Trans>}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                    </IconButton>
                                </InputAdornment>

                            }}
                        />
                    </div>
                    <div id="submitInput" >
                        <Button type="submit" disabled={disableButton || loginFormik.isSubmitting} variant="contained" color="primary">
                            <Trans>auth.login</Trans>
                        </Button>
                    </div>
                </form>


                <div id="auxiliaryLinks">
                    <span className="mr-1"><Trans>auth.forgotPassword</Trans></span>
                    <Link href="/auth/password-remind" vcolor="primary">
                        <Trans>auth.restorePassword</Trans>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login