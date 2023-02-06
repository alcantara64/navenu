import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export class CloudMessaging {

    constructor(){
        const initialization = async () =>{
            await notifee.requestPermission()
            const initialNotification = await notifee.getInitialNotification();
            if (initialNotification) {
                console.log('Notification pressed', initialNotification);
            }
           }
           initialization();
    }
 

    onBackgroundNotification = (notification: any) => {
        this.handlePushMessage(notification);
    };


    handlePushMessage = async (
        remoteMessage:any,
    ): Promise<any> => {
        const {notification, data} = remoteMessage;
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });
        const title = notification?.title;
        const body = notification?.body;
        await notifee.displayNotification({
            title,
            body,
            data,
            android: {
                channelId,
            },
        });
    };

    // requestUserPermission = async (): Promise<boolean> => {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //         authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    //     return enabled;
    // };

    checkInitialNotification = async () => {
        const initialNotification = await notifee.getInitialNotification();
        if (initialNotification) {
            console.log('Notification pressed', initialNotification);
        }
    };

    sendFakePushNotification = async () => {
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });
        await notifee.displayNotification({
            title:"Welcome to Navenu",
            body: 'Welcome the Navenu App',
            data:undefined,
            android: {
                channelId,
            },
        });
    };

    getDeviceToken = async (): Promise<string> => {
        return messaging().getToken();
    };
}