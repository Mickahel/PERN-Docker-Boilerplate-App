import React, { useState, useEffect, useContext } from 'react';
import config from 'configuration/config'
import Helmet from 'react-helmet';
import { Trans, useTranslation } from 'react-i18next'
import "./style.scss"
import { useHistory } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import * as Yup from 'yup';
import useFetch from 'hooks/useFetch'
import Endpoints from 'Endpoints';
import { ThemeContext } from 'contexts/Providers/ThemeProvider';
import Button from '@material-ui/core/Button';
import { useFormik } from 'formik';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
function RestorePassword(props) {
    let history = useHistory();
    const themeContext = useContext(ThemeContext)
    const [t, i18n] = useTranslation();
    const { fetch, loading, error } = useFetch()
    const [restorePasswordStatus, setRestorePasswordStatus] = useState("RESET")
    let [disableButton, setDisableButton] = useState(true)
    let [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        password1: Yup.string().required(),
        password2: Yup.string().required().min(8).equalTo(Yup.ref('password1'))
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };



    const pushInsideApp = () => {
        const usp = new URLSearchParams(props.location.search)
        const returnUrl = usp.get('returnUrl')
        if (returnUrl) history.push(returnUrl)
        else history.push('/')
    }

    const resetPasswordFormik = useFormik({
        initialValues: {
            password1: '',
            password2: '',

        },
        onSubmit: async (values, formikBag) => {
            try {
                await fetch({
                    url: Endpoints.auth.passwordReset,
                    data: {
                        password: values.password2,
                        activationCode: props.match.params.activationCode
                    },
                    method: "POST",
                })
                setRestorePasswordStatus("RESETTED")

            } catch (e) {
                if (e.status == 404) themeContext.showErrorNotification({ message: "auth." + e.data.message })
                else themeContext.showErrorNotification({ message: "auth.error" })
            }
        },
        validationSchema,
        validate: values => {
            validationSchema.isValid(values)
                .then(e => setDisableButton(!e))
        }
    });

    return (
        <div id="ResetPassword">

            <Helmet title={`${config.name.short} - ${t("auth.resetPassword.title")}`} />

            <div id="ResetPasswordForm">

                <img width="300px" className='mb-5 self-center' src={process.env.PUBLIC_URL + '/img/logos/longLogo.svg'} alt='Main logo' />
                <Typography align="center" variant="h3" gutterBottom>
                    <Trans>auth.resetPassword.title</Trans>
                </Typography>
                {// ? FORM 
                }
                {restorePasswordStatus == "RESET" && <form onSubmit={resetPasswordFormik.handleSubmit} className="mt-6">

                    <div id="formInputs">
                        <TextField
                            error={resetPasswordFormik.touched.password1 && Boolean(resetPasswordFormik.errors.password1)}
                            id="password1"
                            label={<Trans>auth.resetPassword.insertNewPassword</Trans>}
                            variant="filled"
                            onChange={resetPasswordFormik.handleChange}
                            onBlur={resetPasswordFormik.handleBlur}
                            value={resetPasswordFormik.values.password1}
                            helperText={resetPasswordFormik.touched.password1 && <Trans>{resetPasswordFormik.errors.password1}</Trans>}
                            type={showPassword ? 'text' : 'password'}
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

                        <TextField
                            error={resetPasswordFormik.touched.password2 && Boolean(resetPasswordFormik.errors.password2)}
                            variant="filled"
                            id='password2'
                            label={<Trans>auth.resetPassword.insertNewPasswordAgain</Trans>}
                            type={showPassword ? 'text' : 'password'}
                            onChange={resetPasswordFormik.handleChange}
                            onBlur={resetPasswordFormik.handleBlur}
                            value={resetPasswordFormik.values.password2}
                            helperText={resetPasswordFormik.touched.password2 && <Trans>{resetPasswordFormik.errors.password2}</Trans>}
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
                        <Button size="large" type="submit" disabled={disableButton || resetPasswordFormik.isSubmitting} variant="contained" color="primary">
                            <Trans>auth.resetPassword.title</Trans>
                        </Button>
                    </div>
                </form>}

                {restorePasswordStatus == "RESETTED" &&
                    <>
                        <Typography align="center" variant="body1" gutterBottom>
                            <Trans>auth.resetPassword.resettedPasswordText</Trans>
                        </Typography>
                        <img width="100px" className='mt-5 mb-10 self-center' src={process.env.PUBLIC_URL + '/img/tick.svg'} alt='Confirm Image' />
                        <div className="flex justify-center">
                            <Button variant="contained" color="primary" onClick={() => { pushInsideApp() }}><Trans>auth.resetPassword.goToApp</Trans></Button>
                        </div>
                    </>}
                <div id="auxiliaryLinks">
                    <span className="mr-1"><Trans>auth.alreadyHaveAnAccount</Trans></span>
                    <Link href="/auth/login" vcolor="primary">
                        <Trans>auth.login</Trans>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default RestorePassword