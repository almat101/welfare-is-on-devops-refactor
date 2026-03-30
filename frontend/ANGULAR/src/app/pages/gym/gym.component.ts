/**
 * @fileoverview GymComponent is responsible for displaying gym-related products and information to the user.
 * It utilizes the GymService to fetch gym products and the GeolocationService to obtain the user's current location.
 * This component is designed as a standalone component, meaning it can be used independently without needing to be declared in an Angular module.
 *
 */
import { Component } from '@angular/core';
import { GymService } from '../../services/services';
import { CommonModule } from '@angular/common';
import { GymResponse } from '../../services/models';
import { GeolocationService } from '../../services/geo/geolocation.service';
import { UpdateLocation$Params, updateLocation } from '../../services/fn/user/update-location';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

/**
 * The GymComponent serves as the primary interface for users interested in gym-related products and services.
 * It dynamically displays a curated list of gym products based on the user's current location, enhancing the user experience by providing personalized options.
 * The component leverages the GymService for fetching the product data and the GeolocationService to accurately determine the user's location.
 */

@Component({
  selector: 'app-gym',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.scss'
})
export class GymComponent {

	/**
	 * Holds the array of gym products fetched from the server.
	 * This property is initialized as an empty array and is populated with the results of a call to the GymService.
	 * Each item in the array is of type `GymResponse`, which represents the structure of gym product data as received from the backend.
	 *
	 * @type {GymResponse[]}
	 */
	gym_products: GymResponse[] = [];

/**
 * @constructor
 * Initializes the component with required services:
 * - `gym`: GymService to fetch gym products.
 * - `geolocationService`: GeolocationService to obtain the user's current location.
 * - `http`: HttpClient for making HTTP requests.
 */
	constructor(
		private gym : GymService,
		private geolocationService: GeolocationService,
		private http: HttpClient,

	) { }

	/**
	 * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
	 * In this method, two primary operations are performed:
	 * 1. `getNearestGym` is called to fetch the nearest gym information.
	 * 2. `requestAndUpdateLocation` is called to request the user's current location and update it accordingly.
	 *
	 * @returns {void}
	 */
	ngOnInit():void {
	  this.getNearestGym();
	  this.requestAndUpdateLocation();
	}

	/**
	 * Fetches the nearest gym information from the gym service.
	 * Upon successful fetching, the response object containing gym information is assigned to `gym_products`.
	 * This method subscribes to the observable returned by `getNearestGym` method of the gym service,
	 * and updates the `gym_products` property with the received data.
	 */
	getNearestGym() {
	  this.gym.getNearestGym().subscribe((gymOBJ) => {
		this.gym_products = gymOBJ;
		//console.log(this.gym_products);
	  })
	}

	/**
	 * Requests the user's current location and updates it using the `updateMyLocation` method.
	 * This method utilizes the `geolocationService` to obtain the user's current geographical position.
	 * If the location is successfully obtained, it proceeds to call `updateMyLocation` to handle the location data.
	 * In case of an error (e.g., permission denied, location services turned off), it logs the error to the console.
	 */
	requestAndUpdateLocation() {
		this.geolocationService.getCurrentPosition().then(() => {
		  this.updateMyLocation();
		}).catch(error => {
		  console.error('Error getting location', error);
		});
	  }

	/**
	 * Updates the user's current location in the application's backend.
	 * This method is crucial for providing personalized gym recommendations based on the user's geographical location.
	 * It leverages the `geolocationService` to accurately obtain the user's current position and communicates this information to the backend.
	 *
	 * Workflow:
	 * 1. **Obtain User Location**: Utilizes the `getCurrentPosition` method from the `geolocationService`. This method is asynchronous and returns a promise that resolves with the user's current geographical coordinates (latitude and longitude).
	 * 2. **Prepare Location Data**: Constructs an object of type `UpdateLocation$Params`, encapsulating the latitude and longitude. This object adheres to the expected format of the backend service for location updates.
	 * 3. **Update Backend**: Invokes the `updateLocation` function, passing it the necessary parameters including the `HttpClient` instance for making HTTP requests, the base URL of the gym service, and the location parameters. This function is designed to make a POST request to the backend, updating the user's location.
	 * 4. **Handle Response**: Subscribes to the observable returned by the `updateLocation` function. The subscription has two callbacks:
	 *    - **Success**: On a successful update, it logs a success message along with the server's response. This indicates that the user's location has been successfully updated in the backend.
	 *    - **Error**: In case of an error (e.g., network issues, server errors), it captures and logs the error details. This is crucial for debugging and ensuring the user is aware of any issues with the location update process.
	 *
	 * Error Handling:
	 * - **Location Access Denied**: If the user denies access to their location or if the `getCurrentPosition` method fails for any other reason (e.g., location services disabled), the promise is rejected. This method catches such rejections and logs an appropriate error message, ensuring the application can gracefully handle these scenarios without crashing.
	 *
	 * @remarks
	 * This method is a key part of the application's functionality that enhances user experience by providing location-based services. Proper error handling and logging are implemented to ensure reliability and ease of maintenance.
	 *
	 */
	updateMyLocation() {
			this.geolocationService.getCurrentPosition().then(position => {
			  const { latitude, longitude } = position;
			  const params: UpdateLocation$Params = { latitude: latitude, longitude: longitude };
			  updateLocation(this.http,this.gym.rootUrl,params).subscribe({
				next: (response) => {
					console.log('Location updated successfully');
					console.log(response);
				  },
				  error: (error) => {
					console.error('Error updating location:', error);
				  }
				});
			}).catch(error => {
			  console.error('Error getting location', error);
			});
		  }

}
