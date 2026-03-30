/**
 * Provides geolocation services to Angular applications.
 * This service encapsulates the browser's Geolocation API, offering a simplified Promise-based method to obtain the user's current geographical position.
 * It is designed to be injected into components or other services that require access to the user's location.
 *
 * @remarks
 * The service checks if the Geolocation API is supported in the browser. If not, it rejects the promise with an error.
 * On successful location retrieval, it resolves the promise with an object containing the latitude and longitude.
 * In case of an error (e.g., user denies location access), the promise is rejected with the error returned by the Geolocation API.
 *
 * @injectable
 * @providedIn 'root' - This service is provided in the root injector and can be injected throughout the application.
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() {}


  /**
 * Wraps the browser's Geolocation API in a Promise to asynchronously obtain the user's current geographical position.
 * This method checks if the Geolocation API is available in the user's browser. If available, it attempts to retrieve the current position.
 * On success, it resolves the promise with an object containing the latitude and longitude of the user's position.
 * On failure, such as when the user denies permission to access their location or if the Geolocation API is not supported, the promise is rejected with an error.
 *
 * @returns {Promise<{latitude: number, longitude: number}>} A promise that resolves with the user's current geographical coordinates (latitude and longitude) or rejects with an error.
 */
  getCurrentPosition(): Promise<{latitude: number, longitude: number}> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          error => reject(error)
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }
}
