import React, { createContext, useState } from "react";

export const UserContext = createContext("user");

function UserProvider(props) {
  const [user, setUser] = useState(null);

  const userState = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={userState}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
