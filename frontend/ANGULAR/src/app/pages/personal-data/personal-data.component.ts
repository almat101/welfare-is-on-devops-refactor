/**
 * @fileoverview This file contains the PersonalDataComponent, responsible for managing the personal data form within the application.
 * It allows users to view and update their personal information such as gender, marital status, birthdate, and contact details.
 * The component uses Angular's reactive forms for form handling, validation, and submission. It interacts with the PersonalDataService
 * to fetch and save user data. On successful data submission, the user is redirected to the home page. Error handling is implemented
 * to provide feedback on any issues encountered during data fetching or submission.
 *
 */
import { Component, OnInit, ViewChild, TemplateRef  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl,ValidationErrors} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PersonalDataResponse } from '../../services/models';
import { PersonalDataService } from '../../services/services/personal-data.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * The PersonalDataComponent is designed to provide users with a secure and intuitive interface for managing their personal information within the application.
 * It features a comprehensive form where users can input and update details such as their gender, marital status, birthdate, and contact information.
 * Utilizing Angular's powerful reactive forms, the component ensures real-time validation and feedback, enhancing the user experience by making data submission smooth.
 *  Interaction with the backend is handled through the PersonalDataService, which facilitates the retrieval and persistence of user data.
 *  Upon successful update, users are navigated back to the home page, with error handling mechanisms in place to alert users of any issues during the process.
 *  This component is a key part of the user profile management system, emphasizing privacy and user control over their information.
 */

@Component({
  selector: 'app-personal-data',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

		/**
	 * A reference to the 'successModal' template in the component's view.
	 *
	 * This property is decorated with `@ViewChild`, allowing the component class to access
	 * the modal template defined in the component's HTML. It is used to dynamically interact
	 * with the success modal, such as opening or closing it upon successful form submission.
	 *
	 */
	@ViewChild('successModal') successModal!: TemplateRef<any>;

/**
 * FormGroup instance for managing the personal data form.
 *
 * This property holds the form group for the personal data form, which includes form controls
 * for fields such as gender, marital status, birthdate, and contact details. It is used to track
 * the value and validation status of the form and its controls.
 *
 */
  personalDataForm: FormGroup;

/**
 * Holds the current year.
 *
 * This property is used to store the current year, retrieved by creating a new Date instance
 * and calling `getFullYear()` on it. It can be used in the component for calculations or checks
 * related to the current year, such as validating birthdates.
 *
 */
  currentYear = new Date().getFullYear();


  /**
 * Indicates if the current page is the profile page.
 *
 * This boolean flag is used to determine if the component is being used on the profile page.
 * It can affect how the component behaves or is displayed, tailoring the experience to the
 * context in which the personal data form is presented.
 *
 */
  isProfilePage: boolean = false;

  /**
 * Stores error messages for display.
 *
 * This array holds error messages that may occur during the operation of the component, such as
 * errors in fetching or submitting personal data. These messages can be displayed to the user to
 * provide feedback on any issues encountered.
 *
 */
  errorMsg: string[] = [];

  /**
   * Constructs the PersonalDataComponent with necessary dependencies.
   *
   * @param {FormBuilder} formBuilder - The FormBuilder service for creating the form group.
   * @param {PersonalDataService} personalDataService - The service for fetching and saving personal data.
   * @param {Router} router - The Angular Router for navigation.
   * @param {ActivatedRoute} route - The current activated route.
   * @param {NgbModal} modalService - The service for managing modals.
   */
  constructor(
    private formBuilder: FormBuilder,
    private personalDataService: PersonalDataService,
    private router: Router,
    private route: ActivatedRoute,
	private modalService: NgbModal,
  ) {

	/**
 * Initializes the personalDataForm FormGroup with form controls.
 *
 * This code snippet creates a new FormGroup instance, `personalDataForm`, using the FormBuilder's `group` method.
 * It defines form controls for gender, marital status, birthdate, whether the user has elderly parents or children,
 * mobile number, and work-related fields like 'sede' (location) and 'reparto' (department). Each form control is
 * initialized with a default value, indicating the type of data expected (e.g., boolean for married, string for gender).
 */
    this.personalDataForm = this.formBuilder.group({
      gender: [''],
      married: [false],
      birthdate: [''],
      elderlyParents: [false],
      children: [false],
      mobileNumber: [''],
      sede: [''],
      reparto: [''],
    });
  }

  /**
 * Lifecycle hook that is called after Angular has initialized the component and set the input properties.
 *
 * In this method, `loadPersonalData` is called to fetch and populate the form with the user's existing personal data.
 * This ensures that when the component is displayed, it already contains the most up-to-date information about the user.
 */
  ngOnInit(): void {
    this.loadPersonalData();
  }

  /**
 * Fetches the user's personal data and updates the form values.
 *
 * This method calls `getPersonalData` on the `personalDataService` to asynchronously fetch the user's personal data.
 * Upon successful retrieval, the method uses `patchValue` to update `personalDataForm` with the fetched data, ensuring
 * the form reflects the user's current personal information. If an error occurs during data fetching, it logs the error
 * message to the console.
 */
  private loadPersonalData(): void {
    this.personalDataService.getPersonalData().subscribe({
      next: (data: PersonalDataResponse) => {
        this.personalDataForm.patchValue(data);
      },
      error: (error) => {
        console.error('Error fetching personal data:', error);
      }
    });
  }

  /**
 * Handles the submission of the personal data form.
 *
 * This method is triggered when the user submits the personal data form. It first clears any existing error messages.
 * Then, it calls `savePersonalData` on `personalDataService`, passing the form's current values wrapped in an object
 * with a `body` property. It subscribes to the observable returned by `savePersonalData` to handle the response.
 *
 * On successful data save, it logs a success message and navigates the user to the 'home' route. If an error occurs,
 * it adds the error message to the `errorMsg` array for display and logs the error status.
 */
  onSubmit(): void {
    this.errorMsg = [];

    this.personalDataService.savePersonalData({ body: this.personalDataForm.value }).subscribe({
      next: (response) => {
        console.log('Personal data saved successfully:', response);
		this.router.navigate(['home']);
      },
      error: (error) => {
        this.errorMsg.push(error.error.error || 'Si è verificato un errore. Si prega di riprovare.');
        console.log(error.status);
      }
    });
  }

}
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, AbstractControl,ValidationErrors , ReactiveFormsModule} from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { PersonalDataResponse } from '../../services/models';
// import { PersonalDataService } from '../../services/services/personal-data.service';
// import { Router,ActivatedRoute } from '@angular/router';


// @Component({
//   selector: 'app-personal-data',
//   standalone: true,
//   imports: [ReactiveFormsModule,CommonModule],
//   templateUrl: './personal-data.component.html',
//   styleUrls: ['./personal-data.component.scss']
// })
// export class PersonalDataComponent implements OnInit {
// 	personalDataForm: FormGroup;
// 	currentYear = new Date().getFullYear();
// 	isProfilePage: boolean = false;
// 	errorMsg: string[] = [];

// 	constructor(
// 		private formBuilder: FormBuilder,
// 		private personalDataService: PersonalDataService,
// 		private router: Router,
// 		private route: ActivatedRoute
// 	) {
// 		this.personalDataForm = this.formBuilder.group({
// 		gender: [''],
// 		married: [false],
// 		birthdate: [''],
// 		elderlyParents: [false],
// 		children: [false],
// 		//   mobileNumber: ['', [Validators.required,Validators.pattern(/^\+\d{1,3}\d{4,14}$/)]]],
// 		mobileNumber: ['', [ Validators.pattern(/^\d{4,14}$/)]],
// 		sede: ['',],
// 		reparto: [''],
// 		});
// 	}

// 	ngOnInit(): void {
// 			this.loadPersonalData();
// 	}


// 	private loadPersonalData(): void {
// 		this.personalDataService.getPersonalData().subscribe({
// 		next: (data: PersonalDataResponse) => {
// 			this.personalDataForm.patchValue(data);
// 		},
// 		error: (error) => {
// 			console.error('Error fetching personal data:', error);
// 		}
// 		});
// 	}


// 	onSubmit(): void {
// 		this.personalDataService.savePersonalData({ body: this.personalDataForm.value }).subscribe({
// 			next: (response) => {
// 			console.log('Personal data saved successfully:', response);
// 			//open a modal that show the success message

// 			},
// 			error: (error) => {
// 			this.errorMsg.push(error.error.error || 'Si è verificato un errore. Si prega di riprovare.');
// 			console.log(error.status)
// 			}
// 		});

// 	}

// }
	// skip() {
	// 	this.router.navigate(['home']);
	//   }

// }
