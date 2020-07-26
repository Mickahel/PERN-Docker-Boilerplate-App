import React from "react";

// ? import all the contexts
import ThemeProvider from "./Providers/ThemeProvider";


function Provider(props) {
  return (

          <ThemeProvider>
            {props.children}
          </ThemeProvider>

  );
}

export default Provider;
