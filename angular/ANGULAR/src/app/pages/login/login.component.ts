
/**
 * @fileoverview This file defines the LoginComponent, which is responsible for handling user login in the application.
 * It includes functionality for initializing and managing the login form, validating user inputs, and submitting
 * authentication requests to the AuthenticationService. Upon successful authentication, it utilizes the TokenService
 * to store the user's token and redirects the user to a specified route. The component also provides a link to the
 * RegisterComponent for users who need to create an account. It leverages Angular's forms module for form handling,
 * ng-bootstrap for modal interactions, and RxJS for managing asynchronous operations and subscriptions.
 */
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { AuthenticationService } from '../../services/services/authentication.service';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { TokenService } from '../../services/token/token.service';
import { NgbActiveModal , NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from '../register/register.component';
import { Subscription } from 'rxjs';
import { UserInfoService } from '../../services/userInfo/user-info.service';
import { UserResponse } from '../../services/models/user-response';
import { Observable } from 'rxjs';

/**
 * The LoginComponent is designed to facilitate user authentication within the application.
 * It provides a user-friendly interface for logging in, featuring a form where users can enter their credentials.
 * The component validates these inputs using Angular's reactive forms and, upon successful validation, submits the login request through the AuthenticationService.
 * In case of successful authentication, the TokenService is employed to securely store the authentication token, and the user is redirected to the home component.
 * Additionally, for new users, the LoginComponent offers navigation to the RegisterComponent, enabling easy access to account creation.
 * This component integrates with various Angular modules and services, including ng-bootstrap for modal functionality, showcasing a comprehensive approach to handling user authentication in Angular applications.
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, AfterViewInit{
	 /**
     * Reference to the email input element.
     */
	@ViewChild('emailInput') emailInput!: ElementRef;

    /**
     * Observable for the user response, can be null.
     */
	user$!: Observable<UserResponse | null>;

	/**
     * Form group for login form controls.
     */
	loginForm: FormGroup;

	 /**
     * Object to hold authentication request data.
     */
	authRequest: AuthenticationRequest = { email: '', password: '' };

	/**
     * Array to store error messages.
     */
	errorMsg: string[] = [];

	/**
	 * Boolean flag to toggle password visibility.
	 */
	passwordVisible: boolean = false;

	/**
	 * Boolean flag to indicate if the email input has been blurred.
	 */
	emailBlurred = false;

	/**
     * Subscription for email input changes.
     */
	emailSubscription!: Subscription | undefined;

	/**
	 * Boolean flag to indicate if the email input is focused.
	 */
	emailFocused = false;

	/**
	 * Boolean flag to indicate if the email input has been interacted with.
	 */
	emailInteracted = false;

	/**
	 * Subscription for password input changes.
	 */
	passwordSubscription!: Subscription | undefined;

	/**
	 * Boolean flag to indicate if the password input is focused.
	 */
	passwordFocused = false;

	/**
	 * Boolean flag to indicate if the password input has been interacted with.
	 */
	passwordInteracted = false;

	/**
	 * Boolean flag to indicate if the password input has been blurred.
	 */
	passwordBlurred = false;


	/**
     * Regular expression pattern for at least one digit.
     */
	digitPattern = /(?=.*[0-9])/;

	/**
	 * Regular expression pattern for at least one lowercase letter.
	 */
	lowerCasePattern = /(?=.*[a-z])/;

	/**
	 * Regular expression pattern for at least one uppercase letter.
	 */
	upperCasePattern = /(?=.*[A-Z])/;

	/**
	 * Regular expression pattern for at least one special character.
	 */
	specialCharPattern = /(?=.*[!@#$%^&*(),.?":{}|<>])/;

	/**
	 * Regular expression pattern for email validation.
	 */
	emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	/**
	 * Constructs the LoginComponent instance.
	 *
	 * @param {FormBuilder} fb Provides convenient methods for generating controls.
	 * @param {Router} router An Angular service for navigation.
	 * @param {AuthenticationService} authService Service to handle authentication.
	 * @param {TokenService} tokenService Service to manage tokens.
	 * @param {NgbActiveModal} activeModal A reference to the active modal.
	 * @param {NgbModal} modalService Service to manage modal windows.
	 * @param {UserInfoService} userInfoService Service to retrieve user information.
	 */
	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthenticationService,
		private tokenService: TokenService,
		public activeModal: NgbActiveModal,
		private modalService: NgbModal,
		private userInfoService: UserInfoService
	) {
		/**
		 * Initializes the login form with form controls for email and password.
		 * Sets up form validators for required fields, minimum length, and patterns for email and password.
		 * Subscribes to the user information observable to keep track of the user's authentication status.
		 */
		this.loginForm = this.fb.group({
			email: ['',[
				Validators.required,
				Validators.pattern(this.emailPattern)
			]],
			password: ['', [
				Validators.required,
				Validators.minLength(8),
				// Validators.pattern(this.digitPattern),
				// Validators.pattern(this.lowerCasePattern),
				// Validators.pattern(this.upperCasePattern),
				// Validators.pattern(this.specialCharPattern)
			  ]],
		  });
		  this.user$ = this.userInfoService.user$;
		}


		/**
		 * Initializes component logic on component load.
		 * This method is part of Angular's lifecycle hooks, called after Angular has initialized all data-bound properties.
		 * Sets up subscriptions to value changes for the email and password form controls.
		 * Marks the email and password as interacted with if they are focused when their values change.
		 */
		ngOnInit(): void {
			this.emailSubscription = this.loginForm.get('email')?.valueChanges.subscribe(() => {
			  if (this.emailFocused) {
				this.emailInteracted = true;
			  }
			});

			this.passwordSubscription = this.loginForm.get('password')?.valueChanges.subscribe(() => {
			  if (this.passwordFocused) {
				  this.passwordInteracted = true;
			  }
		  });

	}

	/**
	 * Sets focus on the email input element.
	 */
	setFocus() {
		setTimeout(() => {
			if (this.emailInput) {
				this.emailInput.nativeElement.focus();
			}
		}, 10);

	}

	/**
	 * Sets the initial focus on a specific element after the view is fully initialized.
	 * This method is part of Angular's lifecycle hooks, called after Angular initializes the component's views and child views.
	 * `ngAfterViewInit` is useful for DOM manipulations and initializing values that depend on the view's rendering.
	 */
	ngAfterViewInit(): void {
		this.setFocus();
	}

	/**
	 * Toggles the visibility of the password input.
	 */
	togglePasswordVisibility() {
		this.passwordVisible = !this.passwordVisible;
	}

	/**
	 * Handles the blur event on the email input field.
	 * Sets the `emailBlurred` flag to true indicating the email field has been blurred.
	 * Resets the `emailFocused` flag to false indicating the email field is no longer focused.
	 */
	onEmailBlur() {
		this.emailBlurred = true;
		this.emailFocused = false;
	}

	/**
	 * Handles the blur event on the password input field.
	 * Sets the `passwordBlurred` flag to true indicating the password field has been blurred.
	 * Resets the `passwordFocused` flag to false indicating the password field is no longer focused.
	 */
	onPasswordBlur() {
		this.passwordBlurred = true;
		this.passwordFocused = false;
	}

	/**
	 * Handles the focus event on the email input field.
	 * Sets the `emailFocused` flag to true indicating the email field is focused.
	 */
	onEmailFocus() {
		this.emailFocused = true;
	}

	/**
	 * Handles the focus event on the password input field.
	 * Sets the `passwordFocused` flag to true indicating the password field is focused.
	 */
	onPasswordFocus() {
		this.passwordFocused = true;
	}

	/**
	 * Attempts to log in the user using the credentials provided in the login form.
	 * This method first checks if the login form is valid. If not, it displays an error message prompting the user to enter correct credentials.
	 * If the form is valid, it constructs an `AuthenticationRequest` object from the form values, which includes the user's email and password.
	 * This request object is then sent to the authentication service to attempt user authentication.
	 *
	 * Upon successful authentication, the method performs several actions:
	 * - It updates the user's authentication token using the token received from the authentication response.
	 * - It fetches the user's information by calling `updateUserInfo` method of the `userInfoService`.
	 * - Upon successful fetching of the user's information, it navigates the user to the home page and closes the login modal.
	 *
	 * If there is an error during authentication or while updating the user's information, it displays an appropriate error message.
	 *
	 * @usageNotes
	 * This method is bound to the submit event of the login form in the component's template.
	 * It relies on Angular's form validation to ensure the form is valid before attempting to authenticate the user.
	 *
	 * @example
	 * // Example usage in a template
	 * <form [formGroup]="loginForm" (ngSubmit)="login()">
	 *   <!-- form fields -->
	 *   <button type="submit">Login</button>
	 * </form>
	 *
	 * @see AuthenticationRequest - This type is used to type-check the request payload for authentication.
	 * @see AuthenticationService#authenticate - This method is called to perform the actual authentication request to the server.
	 * @see UserInfoService#updateUserInfo - Called to fetch and update the user's information upon successful authentication.
	 * @see Router#navigate - Used to redirect the user to the home page upon successful login.
	 * @see NgbActiveModal#close - Closes the login modal upon successful login.
	 */
	login() {
		this.errorMsg = [];

		if (this.loginForm.invalid){
			this.errorMsg.push('Perfavore inserisci le credenziali corrette.');
			return;
		}
		const authRequest: AuthenticationRequest = this.loginForm.value;

		this.authService.authenticate({ body: authRequest }).subscribe({
			next: (res) => {
			// console.log('accesso ');
			this.tokenService.token = res.token as string;
			this.userInfoService.updateUserInfo().subscribe({
				next: () => {
				this.router.navigate(['home']);
				// Close the modal on successful login
				this.activeModal.close();
				},
				error: (err) => {
				console.error('Failed to update user info', err);
				this.errorMsg.push('Failed to update user info. Please try again.');
				}
			});
			},
		error: (err) => {
			this.errorMsg.push(err.error.error || 'Si è verificato un errore. Si prega di riprovare.');
			this.handleError(err);
		}
		});
	}

	/**
	 * Handles errors that occur during the login process.
	 * Interprets HTTP status codes from failed login attempts and updates the `errorMsg` array with appropriate user-friendly messages.
	 *
	 * @param {any} error The error object received from the login attempt, typically containing a status code and message.
	 */
	handleError(error: any) {
		this.errorMsg = [];
		if (error.status === 400) {
		  this.errorMsg.push('Richiesta non valida. Si prega di controllare le credenziali.');
		} else if (error.status === 401) {
		  this.errorMsg.push('Credenziali non valide. Si prega di riprovare.');
		} else if (error.status === 403) {
		  this.errorMsg.push('Accesso vietato. Non hai i permessi necessari.');
		} else if (error.status === 404) {
		  this.errorMsg.push('Servizio non trovato. Si prega di riprovare.');
		} else if (error.status === 500) {
		  this.errorMsg.push('Errore interno del server. Si prega di riprovare più tardi.');
		} else {
		  this.errorMsg.push('Si è verificato un errore. Si prega di riprovare.');
		}
	  }

	/**
	 * Closes the login modal and resets the login form to its initial state.
	 */
	closeLoginModal() {
		this.resetLoginForm();
		this.activeModal.dismiss();
	}

	/**
	 * Closes the current login modal and opens the registration modal.
	 * Sets a brief timeout before opening the registration modal to ensure the login modal has closed.
	 * Focuses on the email input field of the registration modal once it is opened.
	 */
	openRegisterModal() {
		this.closeLoginModal();

		setTimeout(() => {
			const modalRef = this.modalService.open(RegisterComponent, { centered: true });
			modalRef.componentInstance.emailInput?.nativeElement?.focus();
		  }, 10);
	  }


	/**
	 * Checks if a specific form control has a pattern validation error matching the given pattern.
	 *
	 * @param {string} controlName The name of the form control to check for a pattern error.
	 * @param {RegExp} pattern The regular expression pattern to compare against the control's pattern error.
	 * @returns {boolean} True if the control has a pattern error that matches the given pattern, false otherwise.
	*/
	  hasPatternError(controlName: string, pattern: RegExp): boolean {
		  const control = this.loginForm.get(controlName);
		  if (!control || !control.errors || !control.errors['pattern']) {
		return false;
		}
		return (control.errors['pattern'].requiredPattern === pattern.toString() );
	}

	/**
	 * Resets the login form to its initial state.
	 * Clears the form values, resets the error messages, and sets the email and password blurred flags to false.
	*/
	private resetLoginForm() {
		this.loginForm.reset();
		this.emailBlurred = false;
		this.passwordBlurred = false;
		this.errorMsg = [];
	  }

	/**
	 * Cleans up resources and subscriptions when the component is destroyed.
	 * This method is part of Angular's lifecycle hooks, called just before Angular destroys the component.
	 * Use `ngOnDestroy` to perform any necessary cleanup, such as unsubscribing from observables and detaching event handlers,
	 * to prevent memory leaks.
	*/
	  ngOnDestroy() {
		if (this.emailSubscription) {
		  this.emailSubscription.unsubscribe();
		}
		if (this.passwordSubscription) {
			this.passwordSubscription.unsubscribe();
		}
	}
}
