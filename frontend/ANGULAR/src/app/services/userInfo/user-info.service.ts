// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { UserService } from '../services/user.service';
// import { UserResponse } from '../models/user-response';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserInfoService {
//   private userSubject = new BehaviorSubject<UserResponse | null>(null);
//   user$: Observable<UserResponse | null> = this.userSubject.asObservable();

//   constructor(private userService: UserService) {
//     this.loadUserInfo();
//   }

//   private loadUserInfo(): void {
//     this.userService.getUser().pipe(
//       catchError(error => {
//         // console.error('Error fetching user data:', error);
//         return [];  // Handle the error or provide a fallback
//       })
//     ).subscribe(user => {
//     //   console.log('User data received:', user);
//       this.userSubject.next(user);
//     });
//   }

//   updateUserInfo(): void {
// 	// console.log('Updating user info');
//     this.loadUserInfo();
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserResponse } from '../models/user-response';

/**
 * Service responsible for managing the user's information.
 * Utilizes a BehaviorSubject to maintain the current state of the user's information,
 * allowing components to subscribe and react to changes in the user's data.
 *
 * @class UserInfoService
 * @constructor
 * @param {UserService} userService - The service used to fetch user data from the backend.
 */
@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

/**
 * A BehaviorSubject holding the current user's information or null if not logged in.
 * @private
 * @type {BehaviorSubject<UserResponse | null>}
 */
  private userSubject = new BehaviorSubject<UserResponse | null>(null);


  /**
   * An Observable stream of the current user's information, allowing components to subscribe to user data changes.
   * @public
   * @type {Observable<UserResponse | null>}
   */
  user$: Observable<UserResponse | null> = this.userSubject.asObservable();

  /**
   * Constructs the UserInfoService and initializes its dependencies.
   * @constructor
   * @param {UserService} userService - The UserService dependency to fetch user data.
   */
  constructor(private userService: UserService) {}

   /**
   * Loads the user's information by calling the UserService, handling any errors,
   * and updating the BehaviorSubject with the new user data or null in case of an error.
   * @private
   * @returns {Observable<UserResponse | null>} An Observable emitting the fetched user data or null in case of error.
   */
  private loadUserInfo(): Observable<UserResponse | null> {
    return this.userService.getUser().pipe(
      catchError(error => {
        console.error('Error fetching user data:', error);
        return of(null);  // Provide a fallback value
      }),
      tap(user => this.userSubject.next(user))
    );
  }

  /**
 * Initiates the process to update the current user's information.
 * Calls `loadUserInfo` to fetch the latest user data from the server and updates the internal BehaviorSubject.
 *
 * @returns {Observable<UserResponse | null>} An Observable emitting the updated user data or null in case of an error.
 */
  updateUserInfo(): Observable<UserResponse | null> {
    return this.loadUserInfo();
  }
}
