
/**
 * @fileoverview This file defines the UserDropdownComponent, which is responsible for managing the user dropdown menu in the Angular application.
 * The component displays user-specific options such as viewing the profile, personal data, and favourites.
 * It also handles user logout functionality. The component subscribes to the UserInfoService to fetch and update the user's information upon initialization and provides navigation methods to different parts of the application based on user interaction.
 *
 */
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { CommonModule } from '@angular/common';
import { UserResponse } from '../../services/models/user-response'
import { UserInfoService } from '../../services/userInfo/user-info.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FavouritesComponent } from '../favourites/favourites.component';

/**
 * The UserDropdownComponent is a key UI element in the Angular application, designed to enhance user interaction by providing a personalized navigation menu.
 * This component is strategically placed within the application's navbar, offering users quick access to their profile, personal data, favourites, and a logout option.
 * It dynamically displays the user's name and other relevant information by subscribing to the UserInfoService, ensuring the displayed data is up-to-date.
 * The component also facilitates easy navigation to different parts of the application, such as the Profile and Favourites sections, enhancing the user experience by making these frequently accessed areas readily available.
 * Additionally, the logout functionality is seamlessly integrated, utilizing the TokenService to clear the user's session and redirect them to the login page, thereby ensuring a secure and user-friendly logout process.
 */
@Component({
  selector: 'app-user-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dropdown.component.html',
  styleUrl: './user-dropdown.component.scss'
})
export class UserDropdownComponent implements OnInit {

   /**
   * An Observable that emits the current user's information.
   */
	user$: Observable<UserResponse | null>;

   /**
   * Constructs the UserDropdownComponent with necessary dependencies for token management, user information fetching, and routing.
   * @param tokenService - The service for managing authentication tokens.
   * @param userInfoService - The service for fetching and updating user information.
   * @param router - The Angular Router for navigation.
   */
	constructor(
		private tokenService: TokenService,
		private userInfoService: UserInfoService,
		private router: Router
	) {
		this.user$ = this.userInfoService.user$;
	}

    /**
   * On component initialization, updates the user's information.
   */
	ngOnInit(): void {
		this.userInfoService.updateUserInfo().subscribe({
			next: () => {
				console.log('User info updated');

			},
			error: (err) => {
			console.error('Failed to update user info', err);
			}
		});
		// this.userInfoService.user$.subscribe(user => {
		// //   console.log('User in dropdown:', user);
		//   this.user = user;
		// });
	}

   /**
   * Logs out the user, removes the authentication token, and navigates to the preview page.
   */
	logout() {
		console.log('Logging out');
		this.tokenService.removeToken();
		this.router.navigate(['preview']);
	  }

   /**
   * Navigates to the user's profile page.
   */
	goToProfile() {
		this.router.navigate(['profile']);
	}

   /**
   * Navigates to the user's personal data page.
   */
	goToPersonalData() {
		this.router.navigate(['personal-data']);
	}

   /**
   * Navigates to the user's favourites page.
   */
	goToFav(){
		this.router.navigate(['home/favourites']);
	}
}
