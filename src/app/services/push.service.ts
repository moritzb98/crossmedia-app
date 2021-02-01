import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  Capacitor,
} from '@capacitor/core';

import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushService {

  token;
  message;
  pushMessage;
  currentMessage = new BehaviorSubject(null);
  httpOptions = {
    headers: new HttpHeaders({
      //'Access-Control-Allow-Origin':  '*',
      // 'Access-Control-Allow-Methods': 'POST',
      // 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Credentials': 'true',
      'Authorization': 'Bearer AAAAt2lxe3A:APA91bE2y0kbxGn7ZoqgJO_tPM4o436o_guqmn5C1PI2GyZ0BUgAdoao63xZBI5LeUoI_03nUk4TtGohtBTWCn9wPTLUXFXXUlE9WPnUHclnxiykHsHDmCwax0fbjchkosH8ZlzIQ-XA'
    })
  };

  constructor(private router: Router, private afMessaging: AngularFireMessaging, public http: HttpClient,) { 
    this.afMessaging.messages.subscribe(
      (_message: AngularFireMessaging) => {
        _message.onMessage = _message.onMessage.bind(_message);
        _message.onTokenRefresh = _message.onTokenRefresh.bind(_message);
      }
    )
  }
  
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
      
    }

    requestPermission() {
      // this.afMessaging.requestPermission
      //   .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      //   .subscribe(
      //     (token) => { 
      //       console.log('Permission granted! Save to the server!', token); 
      //       this.token = token;
      //       this.sendPush();
      //     },
      //     (error) => { console.error(error); },  
      //   );
      this.afMessaging.requestToken
        .subscribe(
          (token) => { 
            console.log('Permission granted! Save to the server!', token); 
            this.token = token;
            this.sendPush();
          }
        );
    }

    receiveMessage(){
      this.afMessaging.messages
      .subscribe(
        (payload) => { 
          console.log('Erhalten', payload); 
          this.currentMessage.next(payload);
        }
      );
    }

    deleteToken() {
      this.afMessaging.getToken
        .pipe(mergeMapTo(token => this.afMessaging.deleteToken(token)))
        .subscribe(
          (token) => { console.log('Token deleted!'); },
        );
    }

    listen() {
      this.afMessaging.messages
        .subscribe((message) => { 
          console.log("listen:");
          console.log(message);
        });
    }

    sendPush(){
      // this.pushMessage = {
      //   "message": {
      //     "token" : this.token,
      //     "notification": {
      //       "title": "Test Nachricht",
      //       "body": "Das ist eine Testnachricht"
      //     },
      //     "webpush": {
      //       "headers": {
      //         "Urgency": "high"
      //       },
      //       "notification": {
      //         "body": "Das ist eine Test-Web-Nachricht",
      //         "requireInteraction": "true"
      //       }
      //     }
      //   }
      // };
      this.pushMessage = {
        
            "notification": {
              "title": "Test",
              "body": "Das ist eine Test-Web-Nachricht",
            },
            "to": this.token,
          
    
      };
      //this.httpOptions.headers.append('Authorization', 'key=' + this.token);
      //this.httpOptions.headers.append('Authorization', 'key=AAAAt2lxe3A:APA91bE2y0kbxGn7ZoqgJO_tPM4o436o_guqmn5C1PI2GyZ0BUgAdoao63xZBI5LeUoI_03nUk4TtGohtBTWCn9wPTLUXFXXUlE9WPnUHclnxiykHsHDmCwax0fbjchkosH8ZlzIQ-XA');
      this.http.post('https://fcm.googleapis.com/fcm/send', this.pushMessage, this.httpOptions)
      .subscribe(data => {
        console.log(data);
      });

     
    }

}
