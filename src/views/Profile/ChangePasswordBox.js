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
import useFetch from "hooks/useFetch";
import { UserContext } from "contexts/Providers/UserProvider";
import Endpoints from "Endpoints";
function ChangePasswordBox(props) {
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(
    false
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [disableChangeButton, setDisableChangeButton] = useState(true);
  const { fetch, error } = useFetch();

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(),
    password: Yup.string().required().min(8),
  });

  const changePasswordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
    },
    onSubmit: async (values, formikBag) => {
      try {
        await fetch({
          method: "PUT",
          url: Endpoints.auth.passwordReset,
          data: {
            currentPassword: values.currentPassword,
            password: values.password,
          },
        });
        handleClose();
        formikBag.resetForm();
        themeContext.showSuccessSnackbar({
          message: <Trans>profile.passwordChanged</Trans>,
        });
      } catch (e) {
        if (e?.status < 500)
          themeContext.showErrorSnackbar({
            message: <Trans>profile.passwordIsWrong</Trans>,
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
          <Trans>profile.changePassword</Trans>
        </DialogTitle>
        <form onSubmit={changePasswordFormik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              <Trans>profile.changePasswordText</Trans>
            </DialogContentText>

            <TextField
              variant="outlined"
              id="currentPassword"
              label={<Trans>profile.currentPassword</Trans>}
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
              id="password"
              label={<Trans>profile.newPassword</Trans>}
              type={passwordVisible ? "text" : "password"}
              fullWidth
              onBlur={changePasswordFormik.handleBlur}
              value={changePasswordFormik.values.password}
              error={
                changePasswordFormik.touched.password &&
                Boolean(changePasswordFormik.errors.password)
              }
              helperText={
                changePasswordFormik.touched.password && (
                  <Trans>{changePasswordFormik.errors.password}</Trans>
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
              <Trans>profile.back</Trans>
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={disableChangeButton}
            >
              <Trans>profile.change</Trans>
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Card id="changePassword">
        <CardHeader title={<Trans>profile.changePassword</Trans>} />
        <CardContent className="flex flex-col">
          <div>
            <Trans>profile.changePasswordText</Trans>
          </div>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={() => {
              setOpenChangePasswordDialog(true);
            }}
          >
            <Trans>profile.changeYourPassword</Trans>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

export default ChangePasswordBox;
