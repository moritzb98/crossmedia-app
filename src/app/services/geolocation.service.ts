import { PushService } from './push.service';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Store, StoreServiceService } from './store-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  lat: number;
  long: number;
  private geofence: Observable<Store[]>;
  passedGeofence: boolean;
  passedStore;
  firstInit: boolean;
  stop: boolean;

  constructor(private geolocation: Geolocation, private pushService: PushService, private storeService: StoreServiceService) {
      this.lat = 0;
      this.long = 0;
      this.geofence = this.storeService.getStores();
      this.passedGeofence = false;
      this.firstInit = true;
      this.stop = true;
   }

   /******************************************************* 
     * 
     *  Init Geolocation and getPosition / watchPosition
     * 
    ********************************************************/

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
            this.watchBackground(this.lat, this.long);
          } else {
            this.checkFenceleaved();
          }
        } else {
          alert('Wir können gerade nicht auf deinen Standort zugreifen, bitte lade die App neu oder schau in deinen Einstellungen.');
        }
    });
  }

  /******************************************************* 
     * 
     *  Check if currentPosition is in Geofence
     * 
    ********************************************************/

  compareCoords() {
    console.log("COMPARE");
    let dist: number;
    this.firstInit = false;
    this.geofence.forEach(el => {
      el.forEach(element => {
        dist = (Math.pow(Math.pow(this.lat - element.lat, 2), 0.5) + Math.pow(Math.pow(this.long - element.long, 2), 0.5));
        //alert('Store: ' + el.store + ' - ' + dist);
        if (dist < 0.001 && stop) {
          //Geofence betreten  
          this.passedGeofence = true;
          this.passedStore = element;
          this.stop = false;
          this.pushService.sendPush2(element.name);
          console.log("PUSH", element.name);
        } else if (dist > 0.001 && stop) {
          // Geofence nicht betreten
          console.log("NO-PUSH");
          this.passedStore = {};
        }
      });
    });

  }

  /******************************************************* 
     * 
     *  Watch Position if App is inactive
     * 
    ********************************************************/

  watchBackground(lat, long){
    console.log("WATCH");
    this.lat = lat;
    this.long = long;
    if (!this.passedGeofence){
      this.compareCoords();
    } else {
      this.checkFenceleaved();
    }
  }

  /******************************************************* 
     * 
     *  Check if Fence is leaved
     * 
    ********************************************************/

  checkFenceleaved() {
      console.log("CHECK_FENCE_LEAVED");
      if(this.firstInit){
        this.compareCoords();
      }else{
          let dist: number;
          dist = (this.lat - this.passedStore.lat) + (this.long - this.passedStore.long);
          if (dist > 0.001) {
            // Geofence verlassen
            this.passedGeofence = false;
            this.stop = true;
            this.passedStore = {};
            console.log("GEOFENCE_VERLASSEN");
        }
      }
      
  }

  /******************************************************* 
     * 
     *  Function for testing
     * 
    ********************************************************/

  getPosition() {
    alert('Deine Position: ' + this.lat + ', ' + this.long);
    this.geofence.forEach(el => {
      el.forEach(element => {
        let dist = (Math.pow(Math.pow(this.lat - element.lat, 2), 0.5) + Math.pow(Math.pow(this.long - element.long, 2), 0.5));
        alert('Store: ' +element.name + ' - ' + dist);
      });
    });
  }

}
