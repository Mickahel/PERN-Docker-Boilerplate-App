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
import { Formik } from 'formik';
import Endpoints from 'Endpoints'
import "./style.scss"


function RemindPassowrd(props) {
    let [disableButton, setDisableButton] = useState(true)


    const fetchRemindPassword = ()=>{
        try{
            fetch({
                method: "POST",
                url: Endpoints.auth.login,
            })
        } catch(e){

        }
    }

    let checkEmailValidity = (errors, {email})=> {
        if(!email) {
            errors.email = 'required'

            setDisableButton(true)
        }
        else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
          ) {
            errors.email = 'invalidEmailAddress';
            setDisableButton(true)
          } else{setDisableButton(false)}
    }

    return(
        <div id="remindPassword">

            <Helmet title={`${config.name.short} - ${t("auth.remindPassword")}`} />
            
            <div id="remindPasswordForm">

                <img  width="300px" className='mb-5' src={process.env.PUBLIC_URL +'/img/logos/longLogo.svg'} alt='Main logo' />
                <Typography align="center" variant="h3" gutterBottom>
                    <Trans>auth.remindPassword</Trans>
                </Typography>
                {// ? FORM 
                }
                <Formik
                    initialValues = {{email: ""}}
                    validate = { values =>{
                        const errors = {}
                        checkEmailValidity(errors, values)
                        return errors      
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          console.log(JSON.stringify(values, null, 2))
                          setSubmitting(false);
                        }, 400);
                      }}
                    >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                    <div id="formInputs">
                        <TextField
                            error={Boolean(errors.email)}
                            id="email"
                            label="Email" 
                            variant="outlined"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            helperText={<Trans>{errors.email}</Trans>}
                        />
                        

                    </div>  
                <div  id="submitInput" >    
                    <Button type="submit" disabled={ disableButton|| isSubmitting} variant="contained"     color="primary">
                        <Trans>auth.remindPassword</Trans>
                    </Button>
                </div>    
                </form>
            )}
         
                </Formik>

            </div>
        </div>
    )    
}

export default RemindPassowrd;