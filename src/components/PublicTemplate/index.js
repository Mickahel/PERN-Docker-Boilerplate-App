import React, { useEffect, useContext } from "react";
import "./style.scss";
import { ThemeContext } from "contexts/Providers/ThemeProvider";

function PublicTemplate(props) {
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    if (props.title) themeContext.setTitle(props.title);
  }, []);

  return (
    <div id="publicTemplate">
      <img
        id="left"
        src={process.env.PUBLIC_URL + "/img/placeholders/publicTemplateSide.svg"}
      />
      <div id="right">
        {props.children}
      </div>
    </div>
  );
}

export default PublicTemplate;
