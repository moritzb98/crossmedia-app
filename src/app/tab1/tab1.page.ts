import { PushService } from './../services/push.service';
import { Component } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  message;

  constructor(private geolocationService: GeolocationService, private pushService: PushService) {}

  getMyPosition() {
      this.geolocationService.getPosition();
  }

  testSend(){
    this.pushService.sendPush2();
    // this.pushService.requestPermission();
    // this.pushService.receiveMessage();
    // this.message = this.pushService.currentMessage;
  }
 
}
