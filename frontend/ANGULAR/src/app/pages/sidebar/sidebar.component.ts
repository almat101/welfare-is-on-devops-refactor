
/**
 * @fileoverview This file contains the SidebarComponent class, which is responsible for rendering the sidebar navigation in the Angular application.
 * The sidebar includes links to various sections of the application such as Home, Profile,Pillars, Favourites, and Gym.
 * It utilizes Angular's Router for navigation, NgbModal for modal dialogs, and a custom PillarService for fetching pillar data.
 * The component also handles user authentication state to toggle the display of certain navigation elements based on the user's login status.
 *
 */
import { Component ,OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token/token.service';
import { Router, RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { RouterLink,RouterLinkActive } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { PillarService } from '../../services/services';

/**
 * The SidebarComponent is a crucial navigational element in the Angular application, designed to enhance user experience by providing easy access to key sections such as Home, Profile, Pillars, Favourites, and Gym.
 * It dynamically adjusts its content and visibility of certain links based on the user's authentication status, leveraging the TokenService to determine if a user is logged in.
 * The component employs Angular's Router for seamless navigation across different views without reloading the page.
 * The inclusion of the PillarService enables the sidebar to fetch and display data related to various wellness pillars, making it not just a navigation tool but also a means to engage users with content relevant to their interests.
 * Its standalone nature, combined with the use of CommonModule and RouterLink directives, underscores its modular design, facilitating easy integration into any part of the application.
 */

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,ProfileComponent,FavouritesComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

   /**
   * Holds the list of pillars fetched from the PillarService.
   */
	pillars: any;

	/**
   * An Observable that emits the user's login status.
   */
	isLoggedIn$!: Observable<boolean>;

	/**
	 * Constructs the SidebarComponent with necessary dependencies for navigation, authentication, modal dialogs, and pillar data management.
	 * @param router - The Angular Router for navigation.
	 * @param tokenService - The service for managing authentication tokens.
	 * @param modalService - The service for managing modal dialogs.
	 * @param pillarService - The service for fetching pillar data.
	 * @param rerouter - The strategy for reusing routes or reloading components on navigation.
	 */
	constructor(
		private router : Router,
		private tokenService: TokenService,
		private modalService: NgbModal,
		private pillar: PillarService,
		private rerouter: RouteReuseStrategy,
	){ }


   /**
   * Initializes the component by setting up the isLoggedIn$ observable and fetching the pillars.
   */
	ngOnInit() {

		this.isLoggedIn$ = this.tokenService.isLoggedIn;
		this.pillar.getPillar().subscribe((pillarOBJ) => {
			this.pillars = pillarOBJ;
			// console.log(this.pillars);
		  });
	}

   /**
   * Navigates to a specific pillar page.
   * @param pillar The name of the pillar to navigate to.
   * @param id The ID of the pillar.
   */
	goToPillar(pillar: string, id: string) {
		this.rerouter.shouldReuseRoute = function() {
			return false;
		};
		this.router.navigate(['home', pillar, id]);
	}

   /**
   * Logs out the user and navigates to the preview page.
   */
	logout() {
		this.tokenService.removeToken();
		this.router.navigate(['preview']);
	}

   /**
   * Navigates to the home page.
   */
	goToHome(){
		console.log('go to home');
		this.router.navigate(['home']);
	}


   /**
   * Opens the login modal dialog. Not used in the current implementation.
   */
	openLoginModal() {
		this.modalService.open(LoginComponent, { centered: true });
	}

   /**
   * Opens the register modal dialog.Not used in the current implementation.
   */
	openRegisterModal() {
	this.modalService.open(RegisterComponent, { centered: true });
	}

   /**
   * Navigates to the favourites page.
   */
	goToFav(){
		this.router.navigate(['home/favourites']);
	}

   /**
   * Navigates to the gym page.
   */
	goToGym(){
		this.router.navigate(['home/gym']);
	}
}
