import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../services/userInfo/user-info.service';
import { PersonalDataService, UserService } from '../../services/services';

/**
 * Component for handling welfare coach functionality.
 */

@Component({
  selector: 'app-welfare-coach',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welfare-coach.component.html',
  styleUrl: './welfare-coach.component.scss'
})

export class WelfareCoachComponent implements OnInit {
  /** List of coaches */
  coaches: any;
  /** Coach information */
  coachinfo: any;
  /** Personal information of the user */
  personalinfo: any;
  /** Flag to show all coaches or not */
  showall: boolean = false;
  /** Text for the toggle button */
  buttonText: string = "Mostra tutti";

  /**
   * Constructor for WelfareCoachComponent.
   * @param http - HttpClient for making HTTP requests
   * @param suser - UserService for user-related operations
   * @param spersonalinfo - PersonalDataService for personal data operations
   */
  constructor(private http: HttpClient, private suser: UserService, private spersonalinfo: PersonalDataService) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.personalinfo = [];
    this.coachinfo = [];
    this.getCoaches();
    this.getUserData();
  }

  /**
   * Toggles the display of all coaches or just the user's coaches.
   */
  filtersTab() {
    this.showall = !this.showall;
    this.buttonText = this.showall ? 'Mostra I tuoi coach' : 'Mostra tutti';
  }

  /**
   * Fetches the user's personal data.
   */
  getUserData() {
    this.spersonalinfo.getPersonalData().subscribe((personalDataOBJ) => {
      this.personalinfo = personalDataOBJ;
      console.log(this.personalinfo);
    });
  }

  /**
   * Fetches the list of coaches.
   */
  getCoaches() {
   this.suser.getCoach().subscribe((coachDataOBJ) => {
     this.coachinfo = coachDataOBJ;
     console.log(this.coachinfo);
    });
  }
}
