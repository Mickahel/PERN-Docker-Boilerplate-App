import React, { useEffect, useContext } from "react";
import { ThemeContext } from "contexts/Providers/ThemeProvider";
import "./style.scss";
import Button from '@material-ui/core/Button';
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined';
function Helpers(props) {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    themeContext.setTitle("Helpers",  <CallToActionOutlinedIcon />)
  }, [])

  return (
    <div className="helpers">
      <div className="flex">
        <span className="m-2"><Button variant="contained" color="primary" onClick={() => { themeContext.showInfoSnackbar({ message: "Info" }) }}>Info Snackbar</Button></span>
        <span className="m-2"><Button variant="contained" color="primary" onClick={() => { themeContext.showSuccessSnackbar({ message: "Success" }) }}>Success Snackbar</Button></span>
        <span className="m-2"><Button variant="contained" color="primary" onClick={() => { themeContext.showErrorSnackbar({ message: "Error" }) }}>Error Snackbar</Button></span>
        <span className="m-2"><Button variant="contained" color="primary" onClick={() => { themeContext.showWarningSnackbar({ message: "Warning" }) }}>Warning Snackbar</Button></span> 
      </div>
      <div className="flex">
        <span className="m-2"><Button variant="contained" color="primary" onClick={() => { themeContext.showInfoDialog({ message: "Info" }) }}>Info Dialog</Button></span>
        <span className="m-2"><Button variant="contained" color="primary" onClick={() => { themeContext.showSuccessDialog({ message: "Success" }) }}>Success Dialog</Button></span>
        <span className="m-2"><Button variant="contained" color="primary" onClick={() => { themeContext.showErrorDialog({ message: "Error" }) }}>Error Dialog</Button></span>
        <span className="m-2"><Button variant="contained" color="primary" onClick={() => { themeContext.showWarningDialog({ message: "Warning" }) }}>Warning Dialog</Button></span>
      </div>
    </div>
  )
}

export default Helpers;
