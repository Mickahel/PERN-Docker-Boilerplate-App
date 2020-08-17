export function registerUserToken(data){
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
}

export function removeUserToken(){
    delete localStorage.accessToken
    delete localStorage.refreshToken

}

export function isUserTokenValid(){
    if(!localStorage.getItem("accessToken") || !localStorage.getItem("refreshToken")) return false;
    return true;
}