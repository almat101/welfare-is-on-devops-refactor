
/**
 *  Defines the FooterComponent responsible for rendering the application's footer.
 * This component is a standalone Angular component, meaning it does not require any external modules to be imported in an NgModule.
 * It uses its own template and style files for presentation.
 *
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
