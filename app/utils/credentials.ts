import jwtDecode from "jwt-decode"
import { _rootStore } from "../models"
import { navigate } from "../navigators"
import { UserService } from "../services/userService"

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
      return accessToken
    } else {
      // access has expired, checking refresh token for validity
      if (refreshToken) {
        // refresh token is valid
        const userService = new UserService()
        const response = await userService.refreshToken({ refresh_token: refreshToken })
        if (response.kind === "ok") {
          _rootStore.authenticationStore.setAuthToken(response.data.token)
          _rootStore.authenticationStore.setRefreshToken(response.data.refresh_token);
          return response.data.token;
        } else {
          _rootStore.authenticationStore.logout()
          navigate("Login");
          return null
        }
      } else {
        //  "refresh expired, please login"
        _rootStore.authenticationStore.logout()
        navigate("Login");
        return null
      }
    }
  } else {
    // no access token ask the user to login
    return null
  }
}
