import React from "react";

// ? import all the contexts
import ThemeProvider from "./Providers/ThemeProvider";
import UserProvider from "./Providers/UserProvider";
import FetchProvider from "./Providers/FetchProvider";


function Provider(props) {
  return (
    <FetchProvider>
      <ThemeProvider>
        <UserProvider>
          {props.children}
        </UserProvider>
      </ThemeProvider>
    </FetchProvider>
  );
}

export default Provider;
