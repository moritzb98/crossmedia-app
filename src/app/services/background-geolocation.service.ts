import { Injectable } from '@angular/core';
import BackgroundGeolocation, {
  State,
  Config,
  Location,
  LocationError,
  Geofence,
  HttpEvent,
  MotionActivityEvent,
  ProviderChangeEvent,
  MotionChangeEvent,
  GeofenceEvent,
  GeofencesChangeEvent,
  HeartbeatEvent,
  ConnectivityChangeEvent
} from "cordova-background-geolocation-lt";
import { GeolocationService } from './geolocation.service';



@Injectable({
  providedIn: 'root'
})
export class BackgroundGeolocationService {

  constructor(private geoService: GeolocationService) { }


   configureBackgroundGeolocation() {
    
    /******************************************************* 
     * 
     *  Listen to Events and call watchBackground of Geolcoation-Service
     * 
    ********************************************************/
    BackgroundGeolocation.onLocation(location => {
      console.log('[location] - ', location.coords.longitude, location.coords.latitude);
      this.geoService.watchBackground(location.coords.latitude, location.coords.longitude);
    });

    BackgroundGeolocation.onMotionChange(event => {
      console.log('[motionchange] - ', event.location.coords.longitude, event.location.coords.latitude);
      this.geoService.watchBackground(event.location.coords.latitude, event.location.coords.longitude);
    });

    BackgroundGeolocation.onHttp(response => {
      console.log('[http] - ', response.success, response.status, response.responseText);
    });

    BackgroundGeolocation.onProviderChange(event => {
      console.log('[providerchange] - ', event.enabled, event.status, event.gps);
    });

    BackgroundGeolocation.watchPosition((location) => {
      console.log("[watchPosition] -", location);
    }, (errorCode) => {
      console.log("[watchPosition] ERROR -", errorCode);
    }, {
      interval: 5000
    });

    /******************************************************* 
     * 
     *  Configuration of the Plugin
     * 
    ********************************************************/
    BackgroundGeolocation.ready({
      reset: false,
      debug: false,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 5,
      autoSync: true,
      stopOnTerminate: false,
      startOnBoot: true
    }, (state) => {
      //console.log('[ready] BackgroundGeolocation is ready to use');
      if (!state.enabled) {
        BackgroundGeolocation.start();
      }
    });
  }
}
