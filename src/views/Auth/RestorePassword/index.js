import React, { useState, useContext } from 'react';
import config from 'configuration/config'
import Helmet from 'react-helmet';
import { Trans, useTranslation } from 'react-i18next'
import "./style.scss"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ThemeContext } from 'contexts/Providers/ThemeProvider';
import Typography from '@material-ui/core/Typography';
import { useFormik } from 'formik';
import Endpoints from 'Endpoints'
import "./style.scss"
import * as Yup from 'yup';
import useFetch from 'hooks/useFetch'


function RestorePassword(props) {
    let [disableButton, setDisableButton] = useState(true)
    const { fetch, loading, error, data } = useFetch()
    const [t, i18n] = useTranslation();
    const [restorePasswordStatus, setRestorePasswordStatus] = useState("INSERTING_EMAIL")
    const validationSchema = Yup.object({
        email: Yup.string().email().required(),
    });

    const restorePasswordFormik = useFormik({
        initialValues: {
            email: '',

        },
        onSubmit: async (values, formikBag) => {
            try {
                let data = await fetch({
                    url: Endpoints.auth.lostPasswordEmail,
                    data: values,
                    method: "POST",
                })
                setRestorePasswordStatus("EMAIL_SENT")
            } catch (err) {
                setRestorePasswordStatus("ERROR")
            }
        },
        validationSchema,
        validate: values => {
            validationSchema.isValid(values)
                .then(e => setDisableButton(!e))
        }
    });


    return (
        <div id="RestorePassword">

            <Helmet title={`${config.name.short} - ${t("auth.restorePassword.title")}`} />

            <div id="RestorePasswordForm">

                <img width="300px" className='mb-5 self-center' src={process.env.PUBLIC_URL + '/img/logos/longLogo.svg'} alt='Main logo' />
                <Typography align="center" variant="h3" gutterBottom>
                    <Trans>auth.restorePassword.title</Trans>
                </Typography>

                {(restorePasswordStatus == "INSERTING_EMAIL" || restorePasswordStatus=="ERROR") &&
                    <form onSubmit={restorePasswordFormik.handleSubmit}>
                        <div id="formInputs">
                        {restorePasswordStatus == "ERROR" &&
                                    <>
                                    <Typography align="center" variant="body1" gutterBottom>
                                        <Trans>{`auth.restorePassword.error`}</Trans>
                                    </Typography>
                                    <img width="100px" className='mt-5 mb-10 self-center' src={process.env.PUBLIC_URL + '/img/cross.svg'} alt='Confirm Image' />
                                </>}
                            <TextField
                                error={restorePasswordFormik.touched.email && Boolean(restorePasswordFormik.errors.email)}
                                id="email"
                                label="Email"
                                variant="filled"
                                type="email"
                                name="email"
                                onChange={restorePasswordFormik.handleChange}
                                onBlur={restorePasswordFormik.handleBlur}
                                value={restorePasswordFormik.values.email}
                                helperText={restorePasswordFormik.touched.email && <Trans>{restorePasswordFormik.errors.email}</Trans>}
                            />


                        </div>
                        <div id="submitInput" >
                            <Button size="large" type="submit" disabled={disableButton || restorePasswordFormik.isSubmitting} variant="contained" color="primary">
                                <Trans>auth.restorePassword.title</Trans>
                            </Button>
                        </div>
                    </form>
                }
                {restorePasswordStatus == "EMAIL_SENT" &&
                    <>
                        <Typography align="center" variant="body1" gutterBottom>
                            <Trans>auth.restorePassword.resetPasswordEmailSent</Trans>
                        </Typography>
                        <img width="100px" className='mt-5 mb-10 self-center' src={process.env.PUBLIC_URL + '/img/tick.svg'} alt='Confirm Image' />
                    </>
                }

            </div>
        </div>
    )
}

export default RestorePassword;