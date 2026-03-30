
/**
 * @fileoverview This file contains the ProfileComponent class, which is responsible for managing and displaying the user's profile information within an Angular application.
 * The component listens for navigation end events to refresh the user's information, ensuring the displayed data is always up-to-date.
 * It utilizes the UserInfoService to fetch and update the user's data and handles the subscription to navigation events to prevent memory leaks.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PersonalDataComponent } from '../personal-data/personal-data.component';
import { UserInfoService } from '../../services/userInfo/user-info.service';
import { UserResponse } from '../../services/models/user-response';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

/**
 * The ProfileComponent is designed to serve as the central interface for users to view and manage their personal profile information within the application.
 *  It dynamically updates the user's profile data in response to navigation events, ensuring the information presented is current.
 *  This component leverages the UserInfoService to fetch the user's data, including personal details and preferences, and displays it in a user-friendly format.
 */

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PersonalDataComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

/**
 * Holds the current user's information as an Observable.
 * It is initialized to emit `null` and will subsequently emit `UserResponse` objects as the user's information is updated or fetched.
 * This allows components to reactively display the latest user information.
 */
  user$: Observable<UserResponse | null>;

   /**
   * Subscription to router events to manage unsubscription on component destruction.
   */
  private routerSubscription!: Subscription;

  /**
   * Constructs the ProfileComponent with necessary dependencies.
   * @param userInfoService - The service to fetch and update user information.
   * @param router - The Angular Router for listening to navigation events.
   */
  constructor(private userInfoService: UserInfoService, private router: Router) {
    this.user$ = this.userInfoService.user$;
  }

  /**
   * Initializes the component by setting up a router event subscription to update user information on navigation end.
   */
  ngOnInit(): void {
    // Update user info on every navigation end event
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: () => this.updateUserInfo(),
      error: (err) => console.error('Failed to update user info on navigation', err)
    });

    // Initial load
    this.updateUserInfo();
  }

    /**
   * Updates the user's information by calling the UserInfoService.
   */
  private updateUserInfo(): void {
    this.userInfoService.updateUserInfo().subscribe({
      next: () => console.log('User info updated'),
      error: (err) => console.error('Failed to update user info', err)
    });
  }

  /**
   * Cleans up the component by unsubscribing from the router events subscription to prevent memory leaks.
   */
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}



