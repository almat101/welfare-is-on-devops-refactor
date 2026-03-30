/**
 * @fileoverview This file defines the NavbarComponent which serves as the navigation bar for the application.
 * It includes imports for Angular common functionalities, routing, reactive programming with RxJS, and components
 * for login, registration, preview, user dropdown, and sidebar. The NavbarComponent is marked as standalone and
 * uses several Angular and ng-bootstrap features to provide a dynamic and responsive navigation experience.
 * It relies on the TokenService to manage authentication state and NgbModal for modal interactions.
 */
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token/token.service';
import { Router, RouterLink } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreviewComponent } from '../preview/preview.component';
import { UserDropdownComponent } from '../user-dropdown/user-dropdown.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

/**
 * The NavbarComponent acts as the central navigation hub of the application, providing links to various sections such as login, registration, and user-specific areas.
 * It dynamically adjusts its content based on the user's authentication status, which it determines through the TokenService.
 * For authenticated users, it displays a user dropdown and sidebar access for enhanced navigation options.
 * The component also supports modal dialogs for login and registration, utilizing NgbModal for a seamless user experience.
 * Designed with responsiveness in mind, it ensures a consistent and accessible navigation interface across different devices and screen sizes.
 */

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,LoginComponent, RegisterComponent,PreviewComponent,UserDropdownComponent,SidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{

	/**
	 * An Observable that emits the user's login status.
	 *
	 * This property is used to reactively track whether the user is currently logged in or not
	 * across the application. It emits `true` if the user is logged in, and `false` otherwise.
	 */
	isLoggedIn$!: Observable<boolean>;

/**
 * Constructs the NavbarComponent instance.
 *
 * Initializes the component with necessary dependencies for routing, authentication state management,
 * and modal interactions. The `isLoggedIn$` Observable is used to reactively track the user's authentication
 * status throughout the application's lifecycle.
 *
 * @param {Router} router - The Angular Router service for navigation.
 * @param {TokenService} tokenService - The service for managing authentication tokens.
 * @param {NgbModal} modalService - The service for handling modal dialogs.
 */
  constructor(
	private router : Router,
	private tokenService: TokenService,
	private modalService: NgbModal
) { }

/**
 * Opens the login modal dialog.
 *
 * Utilizes the modalService to open the LoginComponent in a modal dialog. The modal is centered on the screen.
 */
  openLoginModal() {
    this.modalService.open(LoginComponent, { centered: true });
  }

/**
 * Opens the registration modal dialog.
 *
 * Utilizes the modalService to open the RegisterComponent in a modal dialog. The modal is centered on the screen.
 */
  openRegisterModal() {
    this.modalService.open(RegisterComponent, { centered: true });
  }

  /**
 * Lifecycle hook that is called after Angular has initialized all data-bound properties.
 *
 * Initializes the `isLoggedIn$` Observable by assigning it the value from `tokenService.isLoggedIn`.
 * This Observable is used to track the user's authentication status reactively.
 */
  ngOnInit() {
	this.isLoggedIn$ = this.tokenService.isLoggedIn;
  }

  /**
 * Navigates to the welfare coach page.
 *
 * Uses the Angular Router to navigate to the 'welfare-coach' route.
 */
 goToCoach() {
	this.router.navigate(['welfare-coach']);
  }

}
