import { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "../models"

// @ts-ignore
export const LogoutScreen: FC<StackScreenProps<AppStackScreenProps, "Logout">> = observer(
  function LogoutScreen() {
    // Pull in one of our MST stores
    const {
      authenticationStore: { logout },
    } = useStores()
    useEffect(() => {
      logout()
    }, [])

    return null
  },
)
