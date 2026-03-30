/**
 * @fileoverview This file defines the ActivateAccountComponent which is responsible for handling the account activation process.
 * It includes functionality to confirm the activation token and provide feedback to the user.
 */

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/services/authentication.service';
import { skipUntil } from 'rxjs';
import { CodeInputModule } from 'angular-code-input';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';


/**
 * Component for handling account activation.
 * This component is responsible for activating user accounts by confirming the activation token.
 * It interacts with the AuthenticationService to confirm account activation and provides feedback to the user.
 *
 */
@Component({
	selector: 'app-activate-account',
	standalone: true,
	imports: [CommonModule, FormsModule,CodeInputModule,LoginComponent],
	templateUrl: './activate-account.component.html',
	styleUrl: './activate-account.component.scss'
})

export class ActivateAccountComponent {
	/**
	 * Message to be displayed to the user.
	 */
	message = '';

	/**
	 * Flag to indicate whether the form has been submitted.
	 */
	isOkay = true;

	/**
	 * Flag to indicate whether the form has been submitted.
	 */
	submitted = false;

	/**
	 * Constructor for the ActivateAccountComponent.
	 * @param authService The AuthenticationService to use for confirming the account.
	 * @param modalService The NgbModal service to use for opening the login modal.
	 */
	constructor(
		private authService: AuthenticationService,
		private modalService: NgbModal
) {}

/**
 * Confirms the account activation with the provided token by making an API call through the authService.
 * This method is responsible for sending the activation token to the server to verify and activate the user's account.
 * Upon successful activation, it updates the component state to reflect the success and displays a success message.
 * In case of failure (e.g., invalid or expired token), it updates the component state to reflect the failure and displays an error message.
 *
 * @param {string} token - The activation token provided by the user, typically sent via email.
 *
 * @private
 * This method is marked as private and is intended to be used only within the ActivateAccountComponent class.
 *
 * @usageNotes
 * This method is called when the user submits the activation token through the UI. It is not meant to be called directly in code outside of this component.
 *
 * @example
 * // Example of calling confirmAccount with a token
 * this.confirmAccount('1234567890abcdef');
 *
 * @see AuthenticationService#confirm - This method relies on the `confirm` method of the AuthenticationService to make the API call.
 */
private confirmAccount(token: string) {
	this.authService.confirm({
	token
	}).subscribe({
	next: () => {
		this.message = 'Il tuo account è stato attivato con successo.\nEffettua il login per continuare.';
		this.submitted = true;
		this.isOkay = true;
	},
	error: () => {
		this.message = 'Il token di attivazione non è valido o è scaduto.\nPer favore, richiedi un nuovo token di attivazione.';
		this.submitted = true;
		this.isOkay = false;
	}
	});
}

/**
 * Redirects to the login modal.
*/
redirectToLogin() {
	this.openLoginModal();
}

 /**
   * Opens the login modal centered.
   */
openLoginModal() {
	this.modalService.open(LoginComponent, { centered: true });
}

/**
 * Handles the completion of the activation code input.
 * @param token The completed activation token.
 */
onCodeCompleted(token: string) {
	this.confirmAccount(token);
}


/**
 * RxJS operator used to skip values until a certain condition becomes true.
 */
protected readonly skipUntil = skipUntil;

}
