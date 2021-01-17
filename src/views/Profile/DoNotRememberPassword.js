import React, { useContext } from "react";
import { Card, CardContent, CardHeader, Button } from "@material-ui/core";
import { Trans } from "react-i18next";
import "./style.scss";
import CardActions from "@material-ui/core/CardActions";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import useFetch from "hooks/useFetch";
import { UserContext } from "contexts/Providers/UserProvider";
import Endpoints from "Endpoints";
function ChangePasswordBox(props) {
    const themeContext = useContext(ThemeContext);
    const userContext = useContext(UserContext);
    const { fetch } = useFetch();

    return (
        <>
            <div className="doNotRememberPasswordBox">
                <Card >
                    <CardHeader title={<Trans>profile.dontRememberPassword</Trans>} />
                    <CardContent className="flex flex-col">
                        <div>
                            <Trans>profile.dontRememberPasswordText</Trans>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            color="primary"
                            onClick={async () => {
                                try {
                                    await fetch({
                                        url: Endpoints.auth.lostPasswordEmail,
                                        data: { email: userContext.user.email },
                                        method: "POST"
                                    })
                                    themeContext.showSuccessSnackbar({ message: "profile.emailSent" })
                                } catch (e) {

                                }
                            }}
                        >
                            <Trans>profile.remindPassword</Trans>
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </>
    );
}

export default ChangePasswordBox;
