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
          lat: 49.222,
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

  getPosition(){
    this.geolocation.getCurrentPosition().then((resp) => {
        this.lat =  resp.coords.latitude;
        this.long = resp.coords.longitude;
        alert(this.lat + ', ' + this.long);
     }).catch((error) => {
        console.log('Error getting location', error);
     });
  
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        // data.coords.latitude
        // data.coords.longitude
        console.log(this.lat + ', ' + this.long);
        this.compareCoords();
    });
  }

  compareCoords() {
    let num: number;
    let stop = true;
    this.geofence.forEach(el => {
      num = (this.lat - el.lat) + (this.long - el.long);
      if (num < 0.1 && stop) {
          console.log("Geofence betreten: ", el);
          this.passedGeofence = true;
          this.passedStore = el;
          stop = false;

          // Geofence wurde betreten
          alert("Geofence betreten!");
      } else if (num > 0.1 && stop) {
        console.log("Geofence nicht betreten: ", el);
      }
    });
    
  }
  
}
