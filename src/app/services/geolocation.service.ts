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

  constructor(private geolocation: Geolocation) {
      this.lat = 0;
      this.long = 0;
      this.geofence = [
        {
          store: 'rewe',
          lat: 49.2264,
          long: 9.149
        },
        {
          store: 'aldi',
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
        console.log('Error getting location', error);
     });
  
    let watch = this.geolocation.watchPosition({ enableHighAccuracy: true });
    watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        if ("coords" in data) {
          console.log('Beobachte...');
          alert("Beobachte");
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
      //num = (this.lat - el.lat) + (this.long - el.long);
      num = (Math.pow(Math.pow(this.lat - el.lat, 2), 0.5) + Math.pow(Math.pow(this.long - el.lng, 2), 0.5));
      alert('Store: ' + el.store + ' - ' + num);
      if (num < 0.001 && stop) {
          console.log('Geofence betreten: ', el);
          this.passedGeofence = true;
          this.passedStore = el;
          stop = false;

          alert('Geofence betreten!');
      } else if (num > 0.001 && stop) {
          console.log('Geofence nicht betreten: ', el);
          this.passedGeofence = false;
          this.passedStore = {};
      }
    });

  }

  checkFenceleaved() {
      let num: number;
      num = (this.lat - this.passedStore.lat) + (this.long - this.passedStore.long);
      if (num > 0.001) {
        this.passedGeofence = false;
        this.passedStore = {};
        alert('Geofence verlassen!');
    }
  }

  getPosition() {
    alert('Deine Position: ' + this.lat + ', ' + this.long);
    return {lat: this.lat, long: this.long};
  }

}
