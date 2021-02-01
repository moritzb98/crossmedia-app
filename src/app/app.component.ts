import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { PushService } from './services/push.service';
import { GeolocationService } from './services/geolocation.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private pushService: PushService,
    private geolocationService: GeolocationService,
    private oneSignal: OneSignal,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Trigger Push Service
      this.pushService.initPush();

      // Init Geolocations
      this.geolocationService.initGeolocation();

      //Trigger One Signal if is not in Browser
      if(this.platform.is('cordova')){
        this.setupPush();
      }
    });
  }

  // Setupt for One Signal
  setupPush(){
    this.oneSignal.startInit('1ccd31a2-a8de-4bb9-9e93-eedee889cc25', '787748060016');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened().subscribe(data => {
      // Action if Notification is clicked
      alert("Geklickt");
    });
    this.oneSignal.handleNotificationReceived().subscribe(data => {
      // Action if Notification is opened
      alert("Geöffnet!");
    });
    this.oneSignal.endInit();
    console.log("push");
  }
}
