
/**
 * @fileoverview This file contains the RegisterComponent which is responsible for handling the user registration process.
 * It includes form initialization, validation, and submission functionalities.
 */
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/services/authentication.service';
import { RegistrationRequest } from '../../services/models/registration-request';
import { CommonModule } from '@angular/common';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { Subscription } from 'rxjs';

/**
 * The RegisterComponent is tasked with orchestrating the user registration process within the application.
 * It provides a comprehensive form interface for new users to enter their registration details, including name, surname, email, and password.
 * Utilizing Angular's FormBuilder for form creation and Validators for input validation, it ensures that all user inputs meet the application's requirements before submission.
 * Upon form submission, the component leverages the AuthenticationService to communicate with the backend and register the user.
 * In case of successful registration, the user is either directly logged in or redirected to the LoginComponent, based on the application's flow.
 * Additionally, the component is designed as a standalone Angular component, making it easily reusable and modular.
 * It also integrates with ng-bootstrap for modal dialogues, enhancing the UI/UX with modern, responsive modal forms.
 */

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {

	/**
	 * ViewChild reference to the first name input element for focusing.
	*/
	@ViewChild('firstnameInput') firstnameInput!: ElementRef;

	/**
	 * FormGroup instance for the registration form.
	*/
	registerForm: FormGroup;

	/**
	 * RegistrationRequest object to hold the registration request payload.
	*/
	registerRequest: RegistrationRequest = { email: '', firstname: '', lastname: '', password: '' };

	/**
	 * Array to hold error messages.
	*/
	errorMsg: string[] = [];

	/**
	 * Boolean flag to toggle password visibility.
	*/
	passwordVisible: boolean = false;

	/**
	 * Object to track the focus, blur, and interaction state of form controls.
	 */
	controlState: { [key: string]: { focused: boolean, blurred: boolean, interacted: boolean } } = {};

	/**
	 * Subscriptions to form control value changes for interaction state tracking.
	 */
	firstnameSubscription!: Subscription | undefined;

	/**
	 * Subscriptions to form control value changes for interaction state tracking.
	 */
	lastnameSubscription!: Subscription | undefined;

	/**
	 * Subscriptions to form control value changes for interaction state tracking.
	 */
	emailSubscription!: Subscription | undefined;

	/**
	 * Subscriptions to form control value changes for interaction state tracking.
	 */
	passwordSubscription!: Subscription | undefined;



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
	 * @constructor
	 * @param formBuilder - FormBuilder instance for form initialization.
	 * @param router - Router instance for navigation.
	 * @param authService - AuthenticationService instance for registration API call.
	 * @param activeModal - NgbActiveModal instance for modal interaction.
	 * @param modalService - NgbModal instance for opening login modal.
	 */
	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private authService: AuthenticationService,
		public activeModal: NgbActiveModal,
		private modalService: NgbModal
	) {

		/**
		 * Initialize the registration form with form controls and validators.
		 */
		this.registerForm = this.formBuilder.group({
		firstname: ['', Validators.required],
		lastname: ['', Validators.required],
		email: ['', [
			Validators.required,
			Validators.pattern(this.emailPattern)
		]],
		password: ['', [
			Validators.required,
			Validators.minLength(8),
		]],
		});

		/**
		 * Subscribe to form control value changes to track interaction state.
		 */
		this.registerForm.controls['firstname'].valueChanges.subscribe(() => this.setInteractionState('firstname'));

		/**
		 * Subscribe to form control value changes to track interaction state.
		 */
		this.registerForm.controls['lastname'].valueChanges.subscribe(() => this.setInteractionState('lastname'));

		/**
		 * Subscribe to form control value changes to track interaction state.
		 */
		this.registerForm.controls['email'].valueChanges.subscribe(() => this.setInteractionState('email'));

		/**
		 * Subscribe to form control value changes to track interaction state.
		 */
		this.registerForm.controls['password'].valueChanges.subscribe(() => this.setInteractionState('password'));
	}

	/**
	 * Initializes component logic on component load.
	 * This method is part of Angular's lifecycle hooks, called after Angular has initialized all data-bound properties.
	 * It calls `resetRegisterForm` to initialize the registration form.
	 */
	ngOnInit(): void {
		this.resetRegisterForm();
	}

	/**
	 * Lifecycle hook that is called after Angular has fully initialized a component's view.
	 * This method checks if the `firstnameInput` element is available and sets focus to it if present.
	 * It ensures that the focus is set to the first input field for better user experience once the view is fully loaded.
	 */
	ngAfterViewInit(): void {
		if (this.firstnameInput) {
		this.setFocus(this.firstnameInput);
		}
	}

	/**
	 * Lifecycle hook that is called just before Angular destroys the component.
	 * This method is used to perform cleanup to avoid memory leaks, specifically unsubscribing from form control value changes.
	 * It checks if each subscription exists and unsubscribes from it if it does.
	 */
	ngOnDestroy(): void {
		if (this.firstnameSubscription) {
		this.firstnameSubscription.unsubscribe();
		}
		if (this.lastnameSubscription) {
		this.lastnameSubscription.unsubscribe();
		}
		if (this.emailSubscription) {
		this.emailSubscription.unsubscribe();
		}
		if (this.passwordSubscription) {
		this.passwordSubscription.unsubscribe();
		}
	}

	/**
	 * Sets focus on the specified element after a short delay.
	 * @param {ElementRef} elementRef - A reference to the element that should receive focus.
	 */
	setFocus(elementRef: ElementRef) {
		setTimeout(() => {
		elementRef.nativeElement.focus();
		}, 10);
	}

	/**
	 * Toggles the visibility state of the password input field.
	 */
	togglePasswordVisibility() {
		this.passwordVisible = !this.passwordVisible;
	}

	/**
	 * Closes the registration modal and resets the registration form.
	 */
	closeRegisterModal() {
		this.resetRegisterForm();
		this.activeModal.dismiss();
	}

	/**
	 * Closes the registration modal and opens the login modal.
	 * Focuses on the email input field of the login modal after a short delay.
	 */
	openLoginModal() {
		this.closeRegisterModal();
		setTimeout(() => {
		const modalRef = this.modalService.open(LoginComponent, { centered: true });
		modalRef.componentInstance.emailInput?.nativeElement?.focus();
		}, 10);
	}

	/**
	 * Resets the registration form to its initial state and clears any error messages.
	 * Also resets the state of form controls to indicate they have not been interacted with.
	 */
	private resetRegisterForm() {
		this.registerForm.reset();
		this.errorMsg = [];
		this.resetControlStates();
	}

	/**
	 * Handles the user registration process by submitting the registration form data.
	 * This method performs several key actions in the registration workflow:
	 * 1. It initializes an empty array for error messages to display any errors encountered during the process.
	 * 2. It validates the registration form to ensure that all required fields are filled out correctly. If the form is invalid, it adds a specific error message to the `errorMsg` array and halts further execution.
	 * 3. Upon successful validation of the form, it constructs a `RegistrationRequest` object from the form values. This object includes all necessary information required for registration, such as the user's email and password.
	 * 4. It then calls the `register` method of the `authService`, passing the `RegistrationRequest` object as the payload. This method returns an Observable that is subscribed to listen for the response from the registration API call.
	 *    - On successful registration (indicated by the `next` callback), the method navigates the user to the 'activate-account' page using the router's `navigate` method. This step is crucial as it directs the user to verify their email address to activate their account. Additionally, it closes the registration modal, signaling the end of the registration process.
	 *    - If an error occurs during the registration process (indicated by the `error` callback), the method captures the error message returned from the server and adds it to the `errorMsg` array. This error message is then displayed to the user, providing feedback on what went wrong.
	 *
	 * @remarks
	 * This method is designed to provide a seamless registration experience for the user, guiding them through form validation, submission, and error handling. It ensures that the user is informed at every step of the process, from entering valid registration details to successfully navigating to the account activation stage or encountering errors.
	 *
	 * @example
	 * // Example usage in a component template
	 * <form [formGroup]="registerForm" (ngSubmit)="register()">
	 *   <!-- Registration form fields -->
	 *   <button type="submit">Register</button>
	 * </form>
	 *
	 * @see RegistrationRequest - This type defines the structure of the registration request payload.
	 * @see AuthenticationService#register - This method is responsible for sending the registration request to the server.
	 * @see Router#navigate - Used for navigating to the account activation page upon successful registration.
	 * @see NgbActiveModal#close - Closes the registration modal upon successful registration.
	 */
	register() {
		this.errorMsg = [];
		if (this.registerForm.invalid) {
		this.errorMsg.push('Per favore inserisci email e password valide.');
		return;
		}

		const registerRequest: RegistrationRequest = this.registerForm.value;
		this.authService.register({ body: registerRequest }).subscribe({
		next: () => {
			this.router.navigate(['activate-account']);
			this.activeModal.close();
		},
		error: (err) => {
			this.errorMsg.push(err.error.error || 'Si è verificato un errore. Si prega di riprovare.');
		}
		});
	}

	/**
	 * Checks if the specified form control has a pattern validation error matching the given pattern.
	 * @param {string} controlName - The name of the form control to check.
	 * @param {RegExp} pattern - The regular expression pattern to compare against the control's error pattern.
	 * @returns {boolean} - True if the control has a pattern error matching the given pattern, false otherwise.
	 */
	hasPatternError(controlName: string, pattern: RegExp): boolean {
		const control = this.registerForm.get(controlName);
		if (!control || !control.errors || !control.errors['pattern']) {
		return false;
		}
		return control.errors['pattern'].requiredPattern === pattern.toString();
	}

	/**
	 * Sets the interaction state of the specified form control to true if it is currently focused.
	 * This method is used to track whether the user has interacted with a form control.
	 * @param {string} controlName - The name of the form control to update the interaction state for.
	 */
	setInteractionState(controlName: string) {
		if (this.controlState[controlName]?.focused) {
		this.controlState[controlName].interacted = true;
		}
	}

	/**
	 * Handles the focus event on form controls.
	 * Initializes the state for the specified control if it does not exist, and sets its `focused` state to true.
	 * @param {string} controlName - The name of the form control that received focus.
	 */
	onFocus(controlName: string) {
		if (!this.controlState[controlName]) {
		this.controlState[controlName] = { focused: false, blurred: false, interacted: false };
		}
		this.controlState[controlName].focused = true;
	}

	/**
	 * Handles the blur event on form controls.
	 * Sets the `blurred` state to true and `focused` state to false for the specified control.
	 * @param {string} controlName - The name of the form control that lost focus.
	 */
	onBlur(controlName: string) {
		if (this.controlState[controlName]) {
		this.controlState[controlName].blurred = true;
		this.controlState[controlName].focused = false;
		}
	}

	/**
	 * Resets the state of all form controls to their initial state.
	 * This method iterates over the `controlState` object and sets each control's state
	 * to indicate that it has not been focused, blurred, or interacted with.
	 */
	resetControlStates() {
		Object.keys(this.controlState).forEach(key => {
		this.controlState[key] = { focused: false, blurred: false, interacted: false };
		});
	}
}
