import React, { useContext, useState } from "react";
import { Card, CardContent, CardHeader, Button } from "@material-ui/core";
import { Trans } from "react-i18next";
import Divider from "@material-ui/core/Divider";
import "./style.scss";
import CardActions from "@material-ui/core/CardActions";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import Endpoints from "Endpoints";
import { UserContext } from "contexts/Providers/UserProvider";
function ChangePasswordBox(props) {
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(
    false
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [disableChangeButton, setDisableChangeButton] = useState(true);

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("required"),
    newPassword: Yup.string()
      .required("required")
      .min(8, "min8CharacterPassword"),
  });

  const changePasswordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: async (values, formikBag) => {
      try {
        let result = await fetch({
          method: "PUT",
          url: Endpoints.auth.passwordReset,
          data: {
            password: values.currentPassword,
            new_password: values.newPassword,
          },
          urlParams: {
            userId: userContext.user.id,
          },
        });
        handleClose();
        formikBag.resetForm();
        themeContext.showSuccessNotification({
          message: <Trans>passwordChanged</Trans>,
        });
      } catch (e) {
        themeContext.showErrorNotification({
          message: "somethingWentWrong",
        });
      }
    },
    validationSchema,
    validate: (values) => {
      validationSchema.isValid(values).then((e) => setDisableChangeButton(!e));
    },
  });

  const handleClose = () => {
    setOpenChangePasswordDialog(false);
    changePasswordFormik.resetForm();
  };

  return (
    <>
      <Dialog
        open={openChangePasswordDialog}
        onClose={handleClose}
        className="p-5"
      >
        <DialogTitle id="form-dialog-title">
          <Trans>changePassword</Trans>
        </DialogTitle>
        <Divider />
        <form onSubmit={changePasswordFormik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              <Trans>changePasswordText</Trans>
            </DialogContentText>

            <TextField
              variant="outlined"
              id="currentPassword"
              label={<Trans>currentPassword</Trans>}
              type={passwordVisible ? "text" : "password"}
              value={changePasswordFormik.values.currentPassword}
              onBlur={changePasswordFormik.handleBlur}
              onChange={changePasswordFormik.handleChange}
              error={
                changePasswordFormik.touched.currentPassword &&
                Boolean(changePasswordFormik.errors.currentPassword)
              }
              helperText={
                changePasswordFormik.touched.currentPassword && (
                  <Trans>{changePasswordFormik.errors.currentPassword}</Trans>
                )
              }
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    >
                      {passwordVisible ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              variant="outlined"
              id="newPassword"
              label={<Trans>newPassword</Trans>}
              type={passwordVisible ? "text" : "password"}
              fullWidth
              onBlur={changePasswordFormik.handleBlur}
              value={changePasswordFormik.values.newPassword}
              error={
                changePasswordFormik.touched.newPassword &&
                Boolean(changePasswordFormik.errors.newPassword)
              }
              helperText={
                changePasswordFormik.touched.newPassword && (
                  <Trans>{changePasswordFormik.errors.newPassword}</Trans>
                )
              }
              onChange={changePasswordFormik.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        setPasswordVisible(!passwordVisible);
                      }}
                    >
                      {passwordVisible ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              <Trans>back</Trans>
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={disableChangeButton}
            >
              <Trans>change</Trans>
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Card id="changePassword" variant="outlined">
        <CardHeader title={<Trans>changePassword</Trans>} />
        <Divider />
        <CardContent className="flex flex-col">
          <div>
            <Trans>changePasswordText</Trans>
          </div>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={() => {
              setOpenChangePasswordDialog(true);
            }}
          >
            <Trans>changeYourPassword</Trans>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default ChangePasswordBox;
