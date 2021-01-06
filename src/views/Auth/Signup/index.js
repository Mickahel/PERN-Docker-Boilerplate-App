import React, { useState, useContext, useEffect, useCallback } from "react";
import config from "configuration/config";
import Helmet from "react-helmet";
import { Trans, useTranslation } from "react-i18next";
import "./style.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Chip from "@material-ui/core/Chip";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import * as Yup from "yup";
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import { UserContext } from "contexts/Providers/UserProvider";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import Divider from "@material-ui/core/Divider";
import RoundLoader from "components/RoundLoader"

function Signup(props) {
  let [disableButton, setDisableButton] = useState(true);
  let [showPassword, setShowPassword] = useState(false);
  let [isSignupSucceded, setIsSignupSucceded] = useState(false);
  let [loadingRedirect, setLoadingRedirect] = useState(false)
  const [t, i18n] = useTranslation();
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const history = useHistory();
  const { fetch } = useFetch();
  const { loading, fetch: fetchUser } = useFetch();
  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8),
  });

  const isUserLogged = useCallback(async () => {
    try {
      const data = await fetchUser({
        method: "GET",
        url: Endpoints.user.profile,
        redirectToLogin: false,
      });
      userContext.setUser(data);
      history.push("/");
    } catch (e) {
      //console.log("error", e)
    }
  }, []);

  useEffect(() => {
    isUserLogged();
  }, []);



  const socialLogin = type => event => {
    setLoadingRedirect(true)
    const usp = new URLSearchParams(props.location.search)
    const returnUrl = usp.get('returnUrl')
    //Cookies.set('returnUrl', returnUrl);
    window.location.href = process.env.REACT_APP_API_URL + "/v1/auth/login/" + type + "?returnUrl=" + returnUrl
  }

  const signupFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, formikBag) => {
      try {
        await fetch({
          url: Endpoints.auth.signup,
          data: values,
          method: "POST",
        });
        setIsSignupSucceded(true);
      } catch (err) {
        if (err?.status < 500)
          themeContext.showErrorSnackbar({
            message: err.data.message,
          });
      }
    },
    validationSchema,
    validate: (values) => {
      validationSchema.isValid(values).then((e) => setDisableButton(!e));
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  if (loading || loadingRedirect == true) return <RoundLoader />;
  return (
    <div id="signup">
      <Helmet title={`${config.name.short} - ${t("auth.signup")}`} />

      <div id="signupForm">
        <img
          width="300px"
          className="mb-5 self-center"
          src={process.env.PUBLIC_URL + "/img/logos/longLogo.svg"}
          alt="Main logo"
        />
        <Typography align="center" variant="h3" gutterBottom>
          <Trans>auth.signup</Trans>
        </Typography>
        <div className="flex w-full justify-end">
          <Chip
            label={<Trans>auth.login</Trans>}
            variant="outlined"
            color="primary"
            onClick={() => {
              history.push("/auth/login");
            }}
          />
        </div>
        {
          // ? FORM
        }
        {!isSignupSucceded && (
          <>
            <form onSubmit={signupFormik.handleSubmit} className="mt-6">
              <div id="formInputs">
                <TextField
                  error={
                    signupFormik.touched.email &&
                    Boolean(signupFormik.errors.email)
                  }
                  id="email"
                  label="Email"
                  variant="filled"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.email}
                  helperText={
                    signupFormik.touched.email && (
                      <Trans>{signupFormik.errors.email}</Trans>
                    )
                  }
                />

                <TextField
                  error={
                    signupFormik.touched.password &&
                    Boolean(signupFormik.errors.password)
                  }
                  variant="filled"
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.password}
                  helperText={
                    signupFormik.touched.password && (
                      <Trans>{signupFormik.errors.password}</Trans>
                    )
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityOutlinedIcon />
                          ) : (
                              <VisibilityOffOutlinedIcon />
                            )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div id="submitInput">
                <Button
                  size="large"
                  type="submit"
                  disabled={disableButton || signupFormik.isSubmitting}
                  variant="contained"
                  color="primary"
                >
                  <Trans>auth.signup</Trans>
                </Button>
              </div>
            </form>

            <span className="mb-3 mt-10">
              <Divider />
              <span className="flex justify-center mt-1">
                <Typography variant="body2">
                  <Trans>auth.loginWithThirdParty</Trans>
                </Typography>
              </span>
            </span>
            <div className=" flex justify-center">
              <FacebookLoginButton
                iconSize="15px"
                align="center"
                onClick={socialLogin('facebook')}
              >
                <Trans>auth.loginWithFacebook</Trans>
              </FacebookLoginButton>
              <GoogleLoginButton
                iconSize="15px"
                align="center"
                onClick={socialLogin('google')}
              >
                <Trans>auth.loginWithGoogle</Trans>
              </GoogleLoginButton>
            </div>
          </>
        )}
        {isSignupSucceded && (
          <>
            <div className="flex flex-col items-center mt-5">
              <div className="w-64">
                <Typography align="center" variant="body2">
                  <Trans>auth.signedupSuccessfully</Trans>
                </Typography>
              </div>
              <div>
                <img
                  width="100px"
                  className="mt-5 self-center"
                  src={process.env.PUBLIC_URL + "/img/tick.svg"}
                  alt="Confirm Image"
                />
              </div>
            </div>
          </>
        )}
        <div id="auxiliaryLinks">
          <span className="mr-1">
            <Trans>auth.forgotPassword</Trans>
          </span>
          <Link href="/auth/restore-password" vcolor="primary">
            <Trans>auth.restorePassword.title</Trans>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
