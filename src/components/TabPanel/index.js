import React from "react";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} className="mt-3" {...other}>
      {value === index && <>{props.children}</>}
    </div>
  );
}

export default TabPanel;
