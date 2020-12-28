import React, { useEffect, useContext } from 'react'
import useFetch from "hooks/useFetch";
import Endpoints from "Endpoints";
import Button from '@material-ui/core/Button';
//import io from 'socket.io-client';
import firebase from 'firebase';
//import '@firebase/messaging'
import { Trans } from 'react-i18next';
import { ThemeContext } from 'contexts/Providers/ThemeProvider';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import * as serviceWorkerRegistration from '../serviceWorkerRegistration';

function NotificationsHandler(props) {
  let { fetch } = useFetch()
  const themeContext = useContext(ThemeContext)

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        messagingSenderId: process.env.REACT_APP_FIREBASE_MESSANGING_SENDER_ID,
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
        appId: process.env.REACT_APP_FIREBASE_APP_ID,
      });
    }
    askForPermissionToReceiveNotifications();
  }, [])


  const askForPermissionToReceiveNotifications = async () => {
    try {
      // ? Registering a custom SW beacuse of path
      //let registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js')

      if (process.env.NODE_ENV !== 'development' && 'serviceWorker' in navigator) {
        //let registration = await navigator.serviceWorker.register()
        let registration = await serviceWorkerRegistration.registerValidSW(
          `${process.env.PUBLIC_URL}/service-worker.js`,
          {
            onUpdate: (registration) => {
              console.log("onUpdate")
              let appUpdateEvent = new Event('app-update');
              window.dispatchEvent(appUpdateEvent);

              registration.waiting.postMessage({ type: 'SKIP_WAITING' })
            },
            onSuccess: function (registration) {
              console.log("onSuccess")
              let appUpdateEvent = new Event('app-update');
              window.dispatchEvent(appUpdateEvent);
            }
          });

        const messaging = firebase.messaging();
        messaging.useServiceWorker(registration)
        let permission = window.Notification ? window.Notification.permission : "blocked"
        // Dialog notifications 
        themeContext.setNotificationsEnabled("granted")

        switch (permission) {
          case "granted":
            await requestPermission()
            break;
          case "default":
            // Se ho già detto no una volta non voglio che il mex ricompaia altrimenti si
            if (!localStorage.doNotShowDialogRequest) themeContext.setNotificationRequestDialogVisible(true)
            else themeContext.setNotificationsEnabled("default")
            break
          default:
            themeContext.setNotificationsEnabled(permission)
            break;
        }

        messaging.onTokenRefresh(getTokenAndSendToServer)

        // Questo viene chiamato quando l'app è aperta
        messaging.onMessage(async payload => {
          console.log('[FIREBASE MESSAGING] Message received', payload);
          //const notificationTitle = event.notification.title;
          const serviceWorker = await navigator.serviceWorker.ready;
          serviceWorker.showNotification(payload.notification.title, payload.notification)
        })
      }
    } catch (error) {
      console.error("[FIREBASE TOKEN] Error in getting permission push notifications", error);
    }
  }

  const getTokenAndSendToServer = async () => {
    try {
      const messaging = firebase.messaging();
      const token = await messaging.getToken();
      console.log('Token:', token);
      await fetch({
        silent: true,
        method: "POST",
        url: Endpoints.pushNotification.sendToken,
        urlParams: {
          token
        },
      })

      return token;

    } catch (e) {
      console.error("[ERROR] getTokenAndSendToServer", e)
    }
  }

  const handleOk = async () => {
    try {
      await requestPermission()
      handleClose(false)()
    } catch (e) {
      console.error("handleOk", e)
    }
  }

  const requestPermission = async () => {
    console.log("requested permission")
    try {
      const messaging = firebase.messaging();
      await messaging.requestPermission()
      await getTokenAndSendToServer()
    } catch (e) {
      console.info("[ERROR][Request permissions]", e)
    } finally {
      themeContext.updateNotificationsEnabled()
    }
  }

  const handleClose = deactivateDialog => () => {
    themeContext.setNotificationRequestDialogVisible(false)
    themeContext.updateNotificationsEnabled()
    if (deactivateDialog) localStorage.doNotShowDialogRequest = true
  }
  return (
    <Collapse in={themeContext.notificationRequestDialogVisible}>
      <div className="mb-3">
        <Alert
          severity="info"
          action={
            <>
              <Button size="small" onClick={handleClose(true)}>
                <Trans>no</Trans>
              </Button>
              {!(themeContext.notificationsEnabled == "denied" || themeContext.notificationsEnabled == "blocked")
                && <Button onClick={handleOk} size="small">
                  <Trans>yes</Trans>
                </Button>}
            </>
          }
        >
          <div>
            <Trans>notificationHandler.title</Trans>
          </div>
          <div>
            <Trans>notificationHandler.content</Trans>
          </div>
          {(themeContext.notificationsEnabled == "denied" || themeContext.notificationsEnabled == "blocked")
            &&
            <div>
              <Trans>notificationHandler.notificationsAreDisabledOrBlocked</Trans>
            </div>
          }
        </Alert>
      </div>
    </Collapse>
  )
}

export default NotificationsHandler