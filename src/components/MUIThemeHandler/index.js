import React, {useContext} from 'react'
import {ThemeProvider} from '@material-ui/styles'
import {createMuiTheme, CssBaseline} from '@material-ui/core'
import {ThemeContext} from 'contexts/Providers/ThemeProvider'
import {primaryColor,secondaryColor} from 'config'
function MUIThemeHandler(props){

    useContext(ThemeContext) 

    if(!localStorage.getItem('theme')){
      localStorage.setItem('theme', 'light')
      //themeContext.setMuiType("light")
    }

    let muithemeConfig = {
        palette: {
            type:localStorage.getItem('theme'),
            primary: {
              main: primaryColor,
            },
            secondary:{
              main: secondaryColor,
            }
          },
        /*overrides:{
          MuiButton:{
            root:{
              backgroundColor: "white"
            }
          }
        }*/
      }

    return(
        <ThemeProvider theme ={createMuiTheme(muithemeConfig)}>
            <CssBaseline />
            {props.children}
        </ThemeProvider>
    )

}


export default MUIThemeHandler