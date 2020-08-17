import React, {useState, useContext } from 'react'
import {PWAInstalledChecker, installApp} from 'auxiliaries/PWA'
import { ThemeContext } from 'context/Providers/ThemeProvider';
import { Trans } from 'react-i18next';
import Button from '@material-ui/core/Button';

function InstallPWAButton(props) {
    let [showButton,setShowButton] = useState(true)

    const themeContext = useContext(ThemeContext)
    //console.log('PWAInstalledChecker()', PWAInstalledChecker())
    //console.log('themeContext.installEvent',themeContext.installEvent)
    if(showButton && !PWAInstalledChecker() && themeContext.installEvent){
    
        return (
            <div id='install-app' className="flex justify-center mt-2">
                <Button 
                    size="small"
                    variant="outlined" 
                    color="primary"
                    className='install-button' 
                    onClick={async ()=>{
                        setShowButton(false)
                        let result = await installApp(themeContext.installEvent)
                        setShowButton(result)
                    }}>
                    <Trans>installApp</Trans>
                </Button>
            </div>
        )}
    else return null
}

export default InstallPWAButton
