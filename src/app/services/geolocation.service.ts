import { PushService } from './push.service';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  lat: number;
  long: number;
  geofence = [];
  passedGeofence: boolean;
  passedStore;

  constructor(private geolocation: Geolocation, private pushService: PushService) {
      this.lat = 0;
      this.long = 0;
      this.geofence = [
        {
          store: 'Rewe',
          lat: 49.2264,
          long: 9.149
        },
        {
          store: 'Aldi',
          lat: 42.111,
          long: 8.555
        }
      ];
      this.passedGeofence = false;
   }

  initGeolocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
        this.lat =  resp.coords.latitude;
        this.long = resp.coords.longitude;
     }).catch((error) => {
        alert(error);
     });
  
    let watch = this.geolocation.watchPosition({ enableHighAccuracy: true });
    watch.subscribe((data) => {
        if ("coords" in data) {
          this.lat =  data.coords.latitude;
          this.long = data.coords.longitude;
          if (!this.passedGeofence){
            this.compareCoords();
          } else {
            this.checkFenceleaved();
          }
        } else {
          alert('Wir können gerade nicht auf deinen Standort zugreifen, bitte lade die App neu oder schau in deinen Einstellungen.');
        }
    });
  }

  compareCoords() {
    let num: number;
    let stop = true;
    this.geofence.forEach(el => {
      num = (Math.pow(Math.pow(this.lat - el.lat, 2), 0.5) + Math.pow(Math.pow(this.long - el.lng, 2), 0.5));
      //alert('Store: ' + el.store + ' - ' + num);
      if (num < 0.001 && stop) {
        //Geofence betreten  
        this.passedGeofence = true;
        this.passedStore = el;
        stop = false;
        this.pushService.sendPush2(el.store);
      } else if (num > 0.001 && stop) {
        // Geofence nicht betreten
        this.passedGeofence = false;
        this.passedStore = {};
      }
    });

  }

  checkFenceleaved() {
      let num: number;
      num = (this.lat - this.passedStore.lat) + (this.long - this.passedStore.long);
      if (num > 0.001) {
        // Geofence verlassen
        this.passedGeofence = false;
        this.passedStore = {};
    }
  }

  getPosition() {
    alert('Deine Position: ' + this.lat + ', ' + this.long);
    this.geofence.forEach(el => {
      let num = (Math.pow(Math.pow(this.lat - el.lat, 2), 0.5) + Math.pow(Math.pow(this.long - el.lng, 2), 0.5));
      alert('Store: ' + el.store + ' - ' + num);
    });
  }

}
