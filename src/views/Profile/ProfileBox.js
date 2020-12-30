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

function ProfileBox(props) {
  const userContext = useContext(UserContext);
  const { fetch } = useFetch();
  const [disabledFields, setDisabledFields] = useState(true);
  const formikProfile = useFormik({
    initialValues: {
      firstname: userContext.user.firstname,
      lastname: userContext.user.lastname,
      email: userContext.user.email,
    },
    onSubmit: async (values) => {
      try {
        const newInformations = await fetch({
          url: Endpoints.user.editProfile,
          data: {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
          },
          method: "PUT",
        });
        userContext.setUser(newInformations);
      } catch (e) { }
    },
  });

  return (
    <Card id="personalInformation" className="flex-2">
      <form onSubmit={formikProfile.handleSubmit}>
        <CardHeader title={<Trans>profile.personalInformation</Trans>} />

        <CardContent>
          <div id="personalInformationData" className="flex flex-col">
            <TextField
              disabled={disabledFields}
              id="firstname"
              label={<Trans>profile.firstname</Trans>}
              variant="filled"
              onChange={formikProfile.handleChange}
              value={formikProfile.values?.firstname}
            />

            <TextField
              disabled={disabledFields}
              id="lastname"
              label={<Trans>profile.lastname</Trans>}
              variant="filled"
              onChange={formikProfile.handleChange}
              value={formikProfile.values?.lastname}
            />
            <TextField
              disabled={disabledFields}
              id="email"
              label="Email"
              variant="filled"
              onChange={formikProfile.handleChange}
              value={formikProfile.values.email}
            />
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
              <Trans>profile.changePersonalInformation</Trans>
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
                <Trans>profile.cancel</Trans>
              </Button>
            </span>
          )}
        </CardActions>
      </form>
    </Card>
  );
}

export default ProfileBox;
