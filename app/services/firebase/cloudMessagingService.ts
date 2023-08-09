import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging"
import notifee from "@notifee/react-native"

export class CloudMessaging {
  isInit = false
  isHeadless = async () => await messaging().getIsHeadless()
  onMessage = (cb: (data: any) => void) => messaging().onMessage(cb)
  constructor() {
    this.init()
  }

  init = async () => {
    if (this.isInit) {
      return
    }
    this.isInit = true
    await messaging().setAutoInitEnabled(false)
    const enabled = await this.requestUserPermission()
    if (enabled) {
      await notifee.requestPermission()
      // await messaging().registerDeviceForRemoteMessages();
    }
    messaging().setBackgroundMessageHandler(this.handlePushMessage)
    this.listenForPushMessages()
    const initialNotification = await notifee.getInitialNotification()
    if (initialNotification) {
      console.log("Notification pressed")
    }
  }

  onBackgroundNotification = (notification: FirebaseMessagingTypes.RemoteMessage) => {
    this.handlePushMessage(notification)
  }

  listenForPushMessages = () => {
    messaging().onMessage(this.handlePushMessage)
  }

  handlePushMessage = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage): Promise<any> => {
    const { notification, data } = remoteMessage
    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    })
    const title = notification?.title
    const body = notification?.body
    await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
      },
    })
  }

  requestUserPermission = async (): Promise<boolean> => {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    return enabled
  }

  checkInitialNotification = async () => {
    const initialNotification = await notifee.getInitialNotification()
    if (initialNotification) {
      console.log("Notification pressed", initialNotification)
    }
  }

  getDeviceToken = async (): Promise<string> => {
    return messaging().getToken()
  }
}
