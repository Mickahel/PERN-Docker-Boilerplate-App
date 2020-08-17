import React from 'react';
import config from 'configuration/config'
import Helmet from 'react-helmet';
import {t} from 'i18next';
import "./style.scss"

function RestorePassword(props) {
    
    return(
        <div id="restorePassword">
            <Helmet title={`${config.name.short} - ${t("restorePassword")}`} />
            
        </div>
    )    
}

export default RestorePassword;