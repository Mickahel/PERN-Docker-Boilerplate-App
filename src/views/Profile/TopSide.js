import React, { useState, useContext } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import { UserContext } from "contexts/Providers/UserProvider";
import Typography from '@material-ui/core/Typography';
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Trans } from "react-i18next";

const useStyles = makeStyles(theme => ({
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    input: {
        display: 'none'
    },
}));


function TopSide(props) {
    const classes = useStyles();
    const userContext = useContext(UserContext);
    const { avatar } = props
    const themeContext = useContext(ThemeContext);

    return (
        <div className="topSide flex justify-between">
            <div className="flex">
                <div>
                    <Avatar className={classes.large} src={userContext.user.avatar}></Avatar>
                </div>
                <div className="flex flex-col justify-center ml-3">
                    <Typography variant="h6" gutterBottom>
                        {userContext.user.username}
                    </Typography>
                    <Typography color="primary" variant="body1" gutterBottom>
                        {userContext.user.email}
                    </Typography>
                </div>
            </div>
            <div className="mt-5">
                <FormControlLabel
                    control={<Switch color="primary" checked={themeContext.muiType == "dark"} onChange={themeContext.toggleMuiType} />}
                    label={<Trans>theme.{themeContext.muiType}Theme</Trans>}
                />
            </div>

        </div>)
}

export default TopSide