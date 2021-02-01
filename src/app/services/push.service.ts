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

import { ToastController } from '@ionic/angular';

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
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAt2lxe3A:APA91bE2y0kbxGn7ZoqgJO_tPM4o436o_guqmn5C1PI2GyZ0BUgAdoao63xZBI5LeUoI_03nUk4TtGohtBTWCn9wPTLUXFXXUlE9WPnUHclnxiykHsHDmCwax0fbjchkosH8ZlzIQ-XA'
    })
  };

  constructor(private router: Router, private afMessaging: AngularFireMessaging, public http: HttpClient, public toastController: ToastController,) { 
   
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


    /******************************************************* 
     * 
     *  Push Notification to Browser and toast
     * 
    ********************************************************/
    requestPermission() {
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
          this.presentToast('Test');
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
          this.message = message;
        });
    }

    sendPush(){
      this.pushMessage = {
        "priority":"HIGH",
        "notification": {
            "title": "Practical Ionic", 
            "body": "Check out my book!",
            },
            "data": {
                "info": "This is my special information for the app!"
            },
        "to": this.token
      };
      console.log(this.pushMessage);
      
      this.http.post('https://fcm.googleapis.com/fcm/send', this.pushMessage, this.httpOptions)
      .subscribe(data => {
        console.log(data);
      });

    }

    async presentToast(msg) {
      const toast = await this.toastController.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

}
