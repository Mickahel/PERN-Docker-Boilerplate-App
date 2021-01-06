import React, { useContext, useState } from "react";
import { UserContext } from "contexts/Providers/UserProvider";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Trans } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import "./style.scss";
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

function DisableUserBox(props) {
    const userContext = useContext(UserContext);
    const { fetch } = useFetch();
    const [disabledFields, setDisabledFields] = useState(true);
    const history = useHistory();
    const themeContext = useContext(ThemeContext);
    let [showPassword, setShowPassword] = useState(false);
    const validationSchema = Yup.object({
        password: Yup.string().required().min(1),
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const formikDisableUser = useFormik({
        initialValues: {
            password: ""
        },
        validationSchema,
        validate: (values) => {
            validationSchema.isValid(values).then((e) => setDisabledFields(!e));
        },
        onSubmit: async (values) => {
            try {
                const result = await fetch({
                    url: Endpoints.user.disableAccount,
                    data: {
                        password: values.password
                    },
                    method: "DELETE",
                });
                const logoutResult = await fetch({
                    url: Endpoints.auth.logout,
                    method: "DELETE"
                })
                history.push("/auth/login");

            } catch (e) {
                if (e.status == 401 && e.data.message == "Password is wrong") themeContext.showErrorSnackbar({ message: "profile.passwordInsertedIsWrong" });
            }
        },
    });

    return (
        <Card id="disableAccount" className="flex-2">
            <form onSubmit={formikDisableUser.handleSubmit}>
                <CardHeader title={<Trans>profile.disableAccount</Trans>} />

                <CardContent>
                    <div id="disableAccountData" className="flex flex-col">
                        <TextField
                            error={
                                formikDisableUser.touched.password &&
                                Boolean(formikDisableUser.errors.password)
                            }
                            variant="filled"
                            id="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={formikDisableUser.handleChange}
                            onBlur={formikDisableUser.handleBlur}
                            value={formikDisableUser.values.password}
                            helperText={
                                formikDisableUser.touched.password && (
                                    <Trans>{formikDisableUser.errors.password}</Trans>
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
                </CardContent>

                <CardActions>
                    <Button
                        disabled={disabledFields}
                        color="primary"
                        onClick={() => {
                            formikDisableUser.handleSubmit();
                        }}
                    >
                        <Trans>profile.disable</Trans>
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
}

export default DisableUserBox;
