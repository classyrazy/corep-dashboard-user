import Graph from "@avanda/avandajs";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "~~/firebase/init";
import useFormRequest from "../useFormRequest";
import { useAlert } from "./useToast";

const config = useRuntimeConfig()

export const useFirebaseNotification = () => {
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
        if (fcmToken) {
            try {
                let req = await new Graph().service("CourseSubscription/notificationPermissionAccepted").params({ token: fcmToken }).get();
                req.getData()
                onMessage(messaging, (payload) => {
                    console.log("new foreground notification", payload)
                    if (payload) {
                        new Notification(payload.notification.title, {
                            body: payload.notification.body,
                        })
                    }
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