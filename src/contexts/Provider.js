import React from "react";

// ? import all the contexts
import ThemeProvider from "./Providers/ThemeProvider";
import UserProvider from "./Providers/UserProvider";

function Provider(props) {
  return (
    <ThemeProvider>
      <UserProvider>{props.children}</UserProvider>
    </ThemeProvider>
  );
}

export default Provider;
