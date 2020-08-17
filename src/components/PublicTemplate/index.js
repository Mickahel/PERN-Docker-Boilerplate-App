import React,{useEffect, useContext} from 'react'
import './style.scss'
import config from 'configuration/config'
import {ThemeContext} from 'contexts/Providers/ThemeProvider'

function PublicTemplate(props) {
    const themeContext = useContext(ThemeContext)

    useEffect(()=>{
        if(props.title) themeContext.setTitle(props.title)
    },[])

    return (
        <div id="publicTemplate" >
                <div id="left" />
                <div id="right">
                    {props.children}
                </div>
        </div>
    )
}

export default PublicTemplate