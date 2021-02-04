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

   // Like any Cordova plugin, you must wait for Platform.ready() before referencing the plugin.
   configureBackgroundGeolocation() {
    // 1.  Listen to events.
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
      interval: 1000
    });

    // 2.  Configure the plugin with #ready
    BackgroundGeolocation.ready({
      reset: false,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 5,
      autoSync: true,
      stopOnTerminate: false,
      startOnBoot: true
    }, (state) => {
      //console.log('[ready] BackgroundGeolocation is ready to use');
      if (!state.enabled) {
        // 3.  Start tracking.
        BackgroundGeolocation.start();
      }
    });
  }
}
