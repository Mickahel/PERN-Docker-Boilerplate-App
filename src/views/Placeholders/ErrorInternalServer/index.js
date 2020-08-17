import React, { useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import 'sass/placeholders.scss'
import { ThemeContext } from 'contexts/Providers/ThemeProvider'
import Typography from '@material-ui/core/Typography';
function ErrorInternalServer(props){

    const themeContext = useContext(ThemeContext)


    useEffect(()=>{
        themeContext.setTitle("placeholder.errorInternalServer")
    },[])


    return (
        <div className='error-page placeholder internal-server-error'>
            <img  width="250px" src='/img/placeholders/internalServerError.svg' alt='500 Internal Server Error' className='error-image'/>
            <Typography variant="h5" gutterBottom className='error-text'>
                <Trans>placeholder.errorInternalServer</Trans>
            </Typography>
            <Link to="/auth/login" color="primary" variant="contained" component={Button} className="error-button">
                <Trans>placeholder.backToHomepage</Trans>
            </Link>
        </div>
    )
}


export default ErrorInternalServer