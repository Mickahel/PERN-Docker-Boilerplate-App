import React, { useContext, useCallback, useEffect } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { UserContext } from "contexts/Providers/UserProvider";
import { Card, CardContent, CardHeader, Button } from "@material-ui/core";
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Typography from '@material-ui/core/Typography';
import "./style.scss";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import { Trans } from 'react-i18next';
const useStyles = makeStyles(theme => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    input: {
        display: 'none'
    },
}));




function UploadProfileImageBox(props) {
    const userContext = useContext(UserContext);
    const classes = useStyles();


    const handleUploadClick = (event) => {
        //console.log(event)
        if (event?.target?.files[0]) {
            var file = event.target.files[0];
            const reader = new FileReader();
            var url = reader.readAsDataURL(file);

            reader.onloadend = function (e) {
                //console.log(reader.result)
                /*this.setState({
                  selectedFile: [reader.result]
                });*/
                userContext.setUser(
                    prevState=>{
                        return {...prevState, avatar: reader.result}
                    })
            }.bind(this);
            //console.log(url); // Would see a path?

            /*this.setState({
              mainState: "uploaded",
              selectedFile: event.target.files[0],
              imageUploaded: 1
            });*/
        }
    };
    return (
        <div className="UploadProfileImage">
            <Card>
                <CardContent>
                    <div className="flex flex-col items-center">
                    <div className="flex">
                        <Avatar className={classes.large} src={userContext.user.avatar}></Avatar>
                        <div>
                            {userContext.user.avatar &&
                                <IconButton onClick={() => {
                                    userContext.setUser(
                                        prevState=>{
                                            //delete prevState.avatar
                                            return {
                                                ...prevState,
                                                avatar: undefined
                                                }
                                        })
                                }}>
                                    <DeleteOutlineOutlinedIcon color="primary" />
                                </IconButton>
                            }
                        </div>
                        </div>
                        <div className="mt-4 mb-2 flex justify-center">
                            <Button color="primary" variant="outlined" component="label">
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    type="file"
                                    onChange={handleUploadClick}
                                />
                                <Trans>profile.upload</Trans>
                            </Button>
                        </div>
                        <div className="mt-2 mb-2 flex justify-center">
                            <Typography color="textSecondary" variant="body1"><Trans>profile.uploadImageText</Trans></Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UploadProfileImageBox