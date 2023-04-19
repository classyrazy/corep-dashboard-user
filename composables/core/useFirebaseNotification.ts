import Graph from "@avanda/avandajs";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "~~/firebase/init";
import useFormRequest from "../useFormRequest";
import { useAlert } from "./useToast";
import useUserScreenSize from "../useUserScreenSize";
const config = useRuntimeConfig()
const {getUserScreenSize, computedDeviceType} = useUserScreenSize()
export const useFirebaseNotification = () => {
    getUserScreenSize()
    async function requestPermission() {
        try {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                console.log("Notification permission granted.");
                saveMessagesDeviceToken();
            } else {
                useAlert().openAlert({ type: "Alert", msg: "Accept Permission to get notified about your courses" });

            }
        } catch (error) {
            console.log(error);
        }
    }
    async function saveMessagesDeviceToken() {
        let fcmToken = await getToken(messaging, { vapidKey: config.VITE_FIREBASE_VAPID_KEY as string })
        console.log("fcmToken", fcmToken)
        useAlert().openAlert({ type: "Alert", msg: "new foreground notification after fcmtoken has been gotten" });

        if (fcmToken) {
            try {
                let req = await new Graph().service("CourseSubscription/notificationPermissionAccepted").params({ token: fcmToken }).get();
                req.getData()
                onMessage(messaging, (payload) => {
                    // console.log("new foreground notification", payload)
                    // useAlert().openAlert({ type: "Alert", msg: "new foreground notification inside on message" });
                    alert(payload.notification?.body)

                    // if (payload) {
                        new Notification(payload.notification?.title || "new notification", {
                            body: payload.notification?.body,
                        })
                        if(computedDeviceType.value === "mobile" && payload.notification?.body){
                            useAlert().openAlert({ type: "Alert", msg: payload.notification?.body });
                        }
                        // alert(payload.notification?.body)
                    // }
                })
            } catch (error) {
                useAlert().openAlert({ type: "Alert", msg: "Something went wrong please try again" });
            }

        } else {
            requestPermission()
        }
    }
    return { requestPermission, saveMessagesDeviceToken };
}