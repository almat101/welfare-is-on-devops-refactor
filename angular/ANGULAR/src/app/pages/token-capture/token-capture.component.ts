
/**
 * @fileoverview This file defines the TokenCaptureComponent, which is responsible for capturing the authentication token from the URL query parameters after a user has authenticated with Google Authentication.
 *  The component listens for changes in the query parameters of the current route, extracts the token if present, and then uses the TokenService to store the token. Depending on whether a token is successfully captured, the component navigates to either the home page (for a successful token capture) or the preview page (if no token is found), thus managing the user's navigation flow post-authentication.
 *
 */
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

/**
 * The TokenCaptureComponent is specifically designed to handle the post-authentication process by capturing and storing the authentication token provided in the URL's query parameters after a user logs in using Google Authentication.
 * It actively listens for changes in the route's query parameters, efficiently extracting and validating the token.
 * Upon successful token retrieval, the TokenService is utilized to securely store the token, marking the user's session as authenticated.
 * The component then intelligently navigates the user to the home page, signifying a successful login.
 * Conversely, if no token is detected, it redirects the user to the preview page, indicating an issue with the authentication process or a direct access attempt without authentication.
 * This component plays a pivotal role in securing and streamlining the user authentication flow within the application.
 */

@Component({
  selector: 'app-token-capture',
  standalone: true,
  imports: [],
  templateUrl: './token-capture.component.html',
  styleUrl: './token-capture.component.scss'
})
export class TokenCaptureComponent implements OnInit{

  /**
   * Constructs the TokenCaptureComponent with the necessary dependencies for routing and token management.
   * @param router - The Angular Router for navigation.
   * @param tokenService - The service for managing authentication tokens.
   * @param route - The current activated route to access query parameters.
   */
  constructor(
	private router: Router,
	private tokenService: TokenService,
	private route: ActivatedRoute
	) { }

  /**
   * On component initialization, subscribes to query parameter changes in the route to capture and store the authentication token.
   * If a token is found, navigates to the home page; otherwise, redirects to the preview page.
   */
	  ngOnInit(): void {

		this.route.queryParams.subscribe(params => {
		const token = params['token'];
		if (token) {
			this.tokenService.token = token;  // Save the token using TokenService
			// console.log(token);
		  this.router.navigate(['/home']);  // Navigate to a protected route
		}
		else
		{
			this.router.navigate(['/preview']);
		}
	  });
	}
}
