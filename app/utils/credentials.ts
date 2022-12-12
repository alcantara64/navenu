import jwtDecode from "jwt-decode"

export const isTokenExpired = (token) => {
  const decoded = jwtDecode<{ exp: number }>(token)

  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}
export const renewToken = async (accessToken, refreshToken) => {
  // check if they is an access token
  if (accessToken) {
    if (!isTokenExpired(accessToken)) {
      console.log("returning access")

      return accessToken
    } else {
      // access has expired, checking refresh token for validity

      if (!isTokenExpired(refreshToken)) {
        // refresh token is valid
        //TODO: get refresh token from server.

        return null
      } else {
      //  "refresh expired, please login"

        return null
      }
    }
  } else {
    // no access token ask the user to login
    return null
  }
}
