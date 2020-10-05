import React, { useState, useContext,useEffect,useCallback } from 'react';
import config from 'configuration/config'
import Helmet from 'react-helmet';
import { Trans,useTranslation  } from 'react-i18next'
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
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Divider from '@material-ui/core/Divider';
import RoundLoader from 'components/RoundLoader';

function Login(props) {
    let [disableButton, setDisableButton] = useState(true)
    let [showPassword, setShowPassword] = useState(false);
    const [t, i18n] = useTranslation();
    const themeContext = useContext(ThemeContext)
    const userContext = useContext(UserContext)
    const history = useHistory()
    const { fetch } = useFetch()
    const { loading,fetch: fetcheUser  } = useFetch()
    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required()
    });

    useEffect(() => {
        isUserLogged()
    }, [])

    const isUserLogged = useCallback(async () => {
        try{
         const data = await fetcheUser({
                method: "GET",
                url: Endpoints.user.profile,
                redirectToLogin:false
            })
            userContext.setUser(data)
            history.push("/")

        } catch(e){
            //console.log("error", e)
        }
    }, [])


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
            try {
                let data = await fetch({
                    url: Endpoints.auth.login,
                    data: values,
                    method: "POST",
                })
                userContext.setUser(data.user)
                pushInsideApp()
            } catch (err) {
                if (err.status == 403) themeContext.showErrorSnackbar({ message: "auth.wrongEmailOrPassword" })
                else if (err.status == 404) themeContext.showErrorSnackbar({ message: "auth."+err.data.message})
            }
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

    function handleClick() {
        alert("Hello!");
    }

if(loading) return <RoundLoader />
    return (

        <div id="login">

            <Helmet title={`${config.name.short} - ${t("auth.login")}`} />

            <div id="loginForm">

                <img width="300px" className='mb-5 self-center' src={process.env.PUBLIC_URL + '/img/logos/longLogo.svg'} alt='Main logo' />
                <Typography align="center" variant="h3" gutterBottom>
                    <Trans>auth.login</Trans>
                </Typography>
                <div className="flex w-full justify-end">
                    <Chip
                        label={<Trans>auth.signup</Trans>}
                        variant="outlined"
                        color="primary"
                        onClick={() => { history.push("/auth/signup") }} />
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
                        <Button size="large" type="submit" disabled={disableButton || loginFormik.isSubmitting} variant="contained" color="primary">
                            <Trans>auth.login</Trans>
                        </Button>
                    </div>
                </form>
                <span className="mb-3 mt-10">
                    <Divider/>
                    <span className="flex justify-center mt-1">
                    <Typography variant="body2">
                        <Trans>auth.loginWithThirdParty</Trans>
                        </Typography>
                </span>
                </span>
                <div className=" flex justify-center">
                    <FacebookLoginButton iconSize="15px" align="center" onClick={handleClick}>
                        <Trans>auth.loginWithFacebook</Trans>
                    </FacebookLoginButton>
                    <GoogleLoginButton iconSize="15px"  align="center"  onClick={handleClick}>
                        <Trans>auth.loginWithGoogle</Trans>
                    </GoogleLoginButton>
                </div>

                <div id="auxiliaryLinks">
                    <span className="mr-1"><Trans>auth.forgotPassword</Trans></span>
                    <Link href="/auth/restore-password" vcolor="primary">
                        <Trans>auth.restorePassword.title</Trans>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login