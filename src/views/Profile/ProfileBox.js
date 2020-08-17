import React, { useContext, useState, useEffect } from "react";
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

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

function ProfileBox(props) {

  const classes = useStyles();
  const [disabledFields, setDisabledFields] = useState(true);


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

  return (
    <Card id="personalInformation" variant="outlined" className="flex-2">
      <form onSubmit={formikProfile.handleSubmit}>
        <CardHeader title={<Trans>personalInformation</Trans>} />
        <Divider />
        <CardContent>
          <div id="personalInformationData" className="flex flex-col">
            <span className="flex flex-row personalInformation-row">
              <TextField
                disabled={disabledFields}
                id="username"
                label={<Trans>username</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.username}
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
            <span className="flex flex-row personalInformation-row">
              <TextField
                disabled={disabledFields}
                id="email"
                label="Email"
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.email}
              />

              <TextField
                disabled={disabledFields}
                id="corporate"
                label={<Trans>corporate</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.company_name}
              />
            </span>

            <span className="mt-2 mb-2">
              <Divider variant="middle" />
            </span>

            <span className="flex flex-row personalInformation-row">
              <TextField
                disabled={disabledFields}
                id="zipCode"
                type="number"
                label={<Trans>zipCode</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.zip}
              />
              <TextField
                disabled={disabledFields}
                id="city"
                label={<Trans>city</Trans>}
                variant="outlined"
                value={formikProfile.values.city}
                onChange={formikProfile.handleChange}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                disabled={disabledFields}
                id="street"
                label={<Trans>street</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.street}
              />
            </span>
            <span className="flex flex-row personalInformation-row justify">
              {disabledFields ? (
                <TextField
                  disabled={disabledFields}
                  id="country"
                  label={<Trans>country</Trans>}
                  variant="outlined"
                  value={formikProfile.values.country.name}
                />
              ) : (
                null
              )}

              {!disabledFields ? (
                null
              ) : (
                <TextField
                  disabled={disabledFields}
                  id="state"
                  label={<Trans>state</Trans>}
                  variant="outlined"
                  value={formikProfile.values.state.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            </span>

            <span className="mt-2 mb-2">
              <Divider variant="middle" />
            </span>

            <span className="flex flex-row personalInformation-row">
              <TextField
                disabled={disabledFields}
                id="fiscalCode"
                label={<Trans>fiscalCode</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.fiscalCode}
              />
              <TextField
                disabled={disabledFields}
                id="PECEmail"
                label={<Trans>PECEmail</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.PECEmail}
              />
              <TextField
                disabled={disabledFields}
                id="piva"
                label={<Trans>piva</Trans>}
                variant="outlined"
                onChange={formikProfile.handleChange}
                value={formikProfile.values.piva}
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
