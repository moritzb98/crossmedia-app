import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor,
} from '@capacitor/core';

import { Router } from '@angular/router';

import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushService {

  private token;
  private message;

  constructor(private router: Router, private afMessaging: AngularFireMessaging) { }
  
  public initPush() {
    if (Capacitor.platform !== 'web') {
      this.registerPush();
    }
  }

  private registerPush() {
      // Request permission to use push notifications
      // iOS will prompt user and return if they granted permission or not
      // Android will just grant without prompting
      PushNotifications.requestPermission().then( result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
  
      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration',
        (token: PushNotificationToken) => {
          //alert('Push registration success, token: ' + token.value);
          console.log(token.value);
          //this.token = token.value;
        }
      );
  
      // Some issue with our setup and push will not work
      PushNotifications.addListener('registrationError',
        (error: any) => {
          alert('Error on registration: ' + JSON.stringify(error));
        }
      );
  
      // Show us the notification payload if the app is open on our device
      PushNotifications.addListener('pushNotificationReceived',
        (notification: PushNotification) => {
          alert('Push received: ' + JSON.stringify(notification));
        }
      );
  
      // Method called when tapping on a notification
      PushNotifications.addListener('pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        }
      );
    }

    setMessage(){
      this.message = {
        data: {
          title_data: 'TEST - data',
          body_data: 'Das ist ein Test - data'
        },
        notification: {
          title: 'TEST',
          body: 'Das ist ein Test'
        },
        token: this.token,
      };
    }

    sendPush(){
      console.log(this.afMessaging);
      // this.afMessaging.messaging().send(this.message)
      //   .then((response) => {
      //     // Response is a message ID string.
      //     console.log('Successfully sent message:', response);
      //   })
      //   .catch((error) => {
      //     console.log('Error sending message:', error);
      //   });
      this.requestPermission();
    }

    requestPermission() {
      this.afMessaging.requestPermission
        .pipe(mergeMapTo(this.afMessaging.tokenChanges))
        .subscribe(
          (token) => { console.log('Permission granted! Save to the server!', token); },
          (error) => { console.error(error); },  
        );
    }

    deleteToken() {
      this.afMessaging.getToken
        .pipe(mergeMapTo(token => this.afMessaging.deleteToken(token)))
        .subscribe(
          (token) => { console.log('Token deleted!'); },
        );
    }
}
