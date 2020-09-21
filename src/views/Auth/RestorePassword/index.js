import React,{useState, useContext} from 'react';
import config from 'configuration/config'
import Helmet from 'react-helmet';
import {t} from 'i18next';
import { Trans } from 'react-i18next'
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
    const { fetch,loading,error,data } = useFetch()

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
                    url: Endpoints.auth.restorePassword,
                    data: values,
                    method: "POST",
                })

            } catch (err) {

            }
        },
        validationSchema,
        validate: values => {
            validationSchema.isValid(values)
                .then(e => setDisableButton(!e))
        }
    });


    return(
        <div id="RestorePassword">

            <Helmet title={`${config.name.short} - ${t("auth.restorePassword")}`} />
            
            <div id="RestorePasswordForm">

                <img  width="300px" className='mb-5 self-center' src={process.env.PUBLIC_URL +'/img/logos/longLogo.svg'} alt='Main logo' />
                <Typography align="center" variant="h3" gutterBottom>
                    <Trans>auth.restorePassword</Trans>
                </Typography>
                {// ? FORM 
                }
                <form onSubmit={restorePasswordFormik.handleSubmit}>
                    <div id="formInputs">
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
                <div  id="submitInput" >    
                    <Button size="large" type="submit" disabled={ disableButton|| restorePasswordFormik .isSubmitting} variant="contained"     color="primary">
                        <Trans>auth.restorePassword</Trans>
                    </Button>
                </div>    
                </form>
            </div>
        </div>
    )    
}

export default RestorePassword;