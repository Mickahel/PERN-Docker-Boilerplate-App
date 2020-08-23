import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "contexts/Providers/UserProvider";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Trans } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import Endpoints from "Endpoints";
import { useFormik } from "formik";
import Avatar from '@material-ui/core/Avatar';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const useStyles = makeStyles(theme =>({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  input:{
    display: 'none'
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
}));

function ProfileBox(props) {

  const classes = useStyles();
  const [disabledFields, setDisabledFields] = useState(true);
  const [avatar,setAvatar] = useState()

  const formikProfile = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleUploadClick = (event) => {
    //console.log(event)
    if(event?.target?.files[0]){
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      //console.log(reader.result)
      /*this.setState({
        selectedFile: [reader.result]
      });*/
      setAvatar(reader.result)
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
    <Card id="personalInformation" variant="outlined" className="flex-2">
      <form onSubmit={formikProfile.handleSubmit}>
        <CardHeader title={<Trans>personalInformation</Trans>} />
        <Divider />
        <CardContent>
        <div className="flex justify-center mb-5">
          <div>
          <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="contained-button-file">
            <Avatar className={classes.large} src={avatar}></Avatar>
            </label>
            </div>
            <div>
            {avatar && 
              <IconButton onClick={()=>setAvatar()}>
              <DeleteOutlineOutlinedIcon color="primary" />
              </IconButton>
            }
            </div>
          </div>
          <div id="personalInformationData" className="flex flex-col">
            <span className="flex flex-row personalInformation-row">
              <TextField
                disabled={disabledFields}
                id="email"
                label={<Trans>email</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.email}
              />
              <TextField
                disabled={disabledFields}
                id="firstname"
                label={<Trans>firstname</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.firstname}
              />

              <TextField
                disabled={disabledFields}
                id="lastname"
                label={<Trans>lastname</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.lastname}
              />
            </span>
          </div>
        </CardContent>

        <CardActions>
          {disabledFields && (
            <Button
              color="primary"
              onClick={() => {
                setDisabledFields(false);
              }}
            >
              <Trans>changePersonalInformation</Trans>
            </Button>
          )}

          {!disabledFields && (
            <span>
              <Button
                //type="submit"
                color="primary"
                onClick={() => {
                  formikProfile.handleSubmit();
                  //formikProfile.resetForm()

                  setDisabledFields(true);
                }}
              >
                <Trans>save</Trans>
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  formikProfile.resetForm();
                  setDisabledFields(true);
                }}
              >
                <Trans>cancel</Trans>
              </Button>
            </span>
          )}
        </CardActions>
      </form>
    </Card>
  );
}

export default ProfileBox;
