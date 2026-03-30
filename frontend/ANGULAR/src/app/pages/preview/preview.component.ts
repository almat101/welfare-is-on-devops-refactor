/**
 * @fileoverview Represents the Preview Component in an Angular application.
 * This component is responsible for displaying information about various well-being pillars.
 * It is a standalone component that imports CommonModule for common Angular directives.
 */
import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * The PreviewComponent serves as a dynamic showcase for the well-being pillars within the application,
 * offering users a glimpse into various health and wellness categories.
 */

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit{

	/**
   * An array of objects representing different pillars of well-being.
   * Each pillar includes a title, description, link to more information, and an image.
   */
	pillars = [
		{
		  title: 'Benessere Fisico',
		  description: 'Collegati a WellHub ed altro',
		  link: 'URL_WELLHUB_APP',
		  image: '../../../assets/img/fis.jpg'
		},
		{
		  title: 'Benessere Economico',
		  description: 'Accedi a convenzioni, piattaforma Flexible Benefits, App JoJob ed altro.',
		  link: 'URL_ECONOMIC_WELL_BEING',
		  image: '../../../assets/img/eco.jpg'
		},
		{
		  title: 'Benessere Psicologico',
		  description: 'Collegati alla piattaforma Stimulus e all\'App B4ooks.',
		  link: 'URL_PSYCHOLOGICAL_WELL_BEING',
		  image: '../../../assets/img/psi.jpg'
		},
		{
		  title: 'Benessere Familiare',
		  description: 'Collegati a Leonardo Care e Leonardo Summer Camp.',
		  link: 'URL_FAMILY_WELL_BEING',
		  image: '../../../assets/img/fam.jpg'
		}
	  ];

	/**
   * The constructor for the PreviewComponent.
   * Currently, it does not perform any specific function.
   */
	constructor() { }

	/**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This method is empty and can be used for initialization logic.
   */
  ngOnInit(): void {

  }




}
