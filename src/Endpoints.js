const Endpoints = {
    auth:{
        signup:             "/v1/auth/signup",                      // ? POST
        login:              "/v1/auth/login",                       // ? POST
        activation:         "/v1/auth/activation/:activationCode",  // ? POST
        lostPasswordEmail:  "/v1/auth/lost-password-email",         // ? POST
        passwordReset:      "/v1/auth/password-reset",              // ? POST
        newAccessToken:     "/v1/auth/token",                       // ? POST
        logout:             "/v1/auth/logout",                      // ? DELETE
        token:              "/v1/auth/token",                       // ? POST
    },
    user:{
        profile:            "/v1/app/user/info",                    // ? GET
        editProfile:        "/v1/app/user/edit"                     // ? GET
    },
    debug:{
        status:             "/v1/debug/status/:status"              // ? GET
    }
}

export default Endpoints