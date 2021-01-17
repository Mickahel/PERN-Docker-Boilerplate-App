import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  Button,
  DialogActions,
  DialogTitle,
  TextField,
  Checkbox,
  Select,
} from "@material-ui/core";
import { useFormik } from "formik";
import _ from "lodash";
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints";
import "./style.scss";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import html2canvas from "html2canvas";
import { Trans, useTranslation } from "react-i18next";
import BugReportOutlinedIcon from "@material-ui/icons/BugReportOutlined";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { useHistory } from "react-router-dom";
import { UserContext } from "contexts/Providers/UserProvider";
function Feedback(props) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { fetch } = useFetch();
  const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const [t, i18n] = useTranslation();
  const openFeedbackPopover = () => {
    props.closeMenu();
    setOpen(true);
    /*this.setState({ wait: true })
        
        html2canvas(document.getElementById('root')).then(canvas=>{
            this.setState({
                open: true,
                wait: false,
                screen: canvas
            })
        })*/
  };
  const feedbackForm = useFormik({
    initialValues: {
      type: "BUG",
      includeScreenshot: true,
    },
    onSubmit: async (values, formikBag) => {
      /*      if (_.isEmpty(values.feedback) && !values.includeScreenshot) {
              closeFeedbackPopover();
              formikBag.setSubmitting(false);
              return;
            }
      */
      // ? Submitting
      try {
        let file = null;
        if (values.includeScreenshot == true) {
          let screen = await html2canvas(document.getElementById("root"));
          const blob = canvasToBlob(screen);
          file = new File([blob], "image.png", {
            type: "image/png",
            lastModified: Date.now(),
          });
        }

        await fetch({
          url: Endpoints.feedback.sendNew,
          method: "POST",
          data: {
            description: values.description,
            type: values.type,
            path: window.location,
            createdBy: userContext.user.id
          },
          file,
          filename: "screenshot",
        });

        themeContext.showSuccessSnackbar({
          message: "feedback.thankYouForTheFeedback",
        });
      } catch (e) {
        if (e?.status < 500)
          themeContext.showErrorSnackbar({ message: "error" });
      }
      //this.props.themeContext.hideWaitDialog()
      formikBag.setSubmitting(false);
      closeFeedbackPopover();
    },
  });

  const closeFeedbackPopover = () => {
    feedbackForm.resetForm();
    setOpen(false);
  };

  const canvasToBlob = (screen, sliceSize) => {
    const base64image = screen.toDataURL("image/png");
    // Split the base64 string in data and contentType
    const block = base64image.split(";");
    // Get the content type
    let contentType = block[0].split(":")[1]; // In this case "image/png"
    // get the real base64 content of the file
    let b64Data = block[1].split(",")[1]; // For example:  iVBORw0KGgouqw23....

    // Convert b64 to blob and store it into a variable (with real base64 as value)
    contentType = contentType || "";
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  let button = (
    <MenuItem onClick={openFeedbackPopover} dense={true}>
      <span className="menuItem">
        <BugReportOutlinedIcon
          className="menuProfileIcon"
          color="action"
          fontSize="small"
        />
        <Typography color="textSecondary" variant="body2">
          <Trans>feedback.sendAFeedback</Trans>
        </Typography>
      </span>
    </MenuItem>
  );

  return (
    <>
      {button}
      <Dialog open={open} fullWidth={true} onClose={closeFeedbackPopover}>
        <form onSubmit={feedbackForm.handleSubmit}>
          <DialogTitle>
            <Trans>feedback.sendAFeedback</Trans>
          </DialogTitle>
          <DialogContent>
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={feedbackForm.handleChange}
                        disabled={feedbackForm.isSubmitting}
                        name="includeScreenshot"
                        color="primary"
                        checked={feedbackForm.values.includeScreenshot}
                      />
                    }
                    label={<Trans>feedback.includeScreenshot</Trans>}
                  />
                </div>
                <div>
                  <FormControl variant="filled">
                    <InputLabel>
                      <Trans>feedback.type</Trans>
                    </InputLabel>
                    <Select
                      onChange={(e) => {
                        feedbackForm.setFieldValue("type", e.target.value);
                      }}
                      value={feedbackForm.values.type}
                    >
                      <MenuItem value={"FEATURE"}>Feature</MenuItem>
                      <MenuItem value={"BUG"}>Bug</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <TextField
              onChange={feedbackForm.handleChange}
              disabled={feedbackForm.isSubmitting}
              className="flex flex-1"
              name="description"
              variant="filled"
              multiline={true}
              rows={5}
              fullWidth={true}
              placeholder={t("feedback.text")}
            />
          </DialogContent>
          <DialogActions>
            <Button
              disabled={feedbackForm.isSubmitting}
              onClick={closeFeedbackPopover}
            >
              <Trans>close</Trans>
            </Button>
            <Button
              disabled={feedbackForm.isSubmitting || !feedbackForm.values.description}
              type="submit"
              variant="contained"
              color="primary"
            >
              <Trans>feedback.send</Trans>
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default Feedback;
