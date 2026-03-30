import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetCategoriesByPillar$Params } from '../../services/fn/category-controller/get-categories-by-pillar';
import { CategoryService, PillarService } from '../../services/services';

/**
 * Component for handling pillar-related functionality.
 */
@Component({
  selector: 'app-pillars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pillars.component.html',
  styleUrl: './pillars.component.scss'
})
export class PillarsComponent {

  pillarClass: any;
  pillarImage: any;
  products: any;
  categories: any;
  pillars: any;
  id = '';
  pillar: any;
  visibleCategoriesCount = 10;
  visibleTrendingCategoriesCount = 10;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private spillar: PillarService, private scategories: CategoryService) { }

  /**
   * Maps a pillar name to its corresponding parameter value.
   * @param {string} pillar - The name of the pillar.
   * @returns {string} The parameter value corresponding to the pillar.
   * @throws {Error} If an unknown pillar is provided.
   */
  mapPillarToParam(pillar: string): string {
    switch (pillar) {
        case 'Economic Well-being':
            return 'ECONOMIC';
        case 'Physical Well-being':
            return 'PHYSICAL';
        case 'Psychological Well-being':
            return 'PSYCHOLOGICAL';
        case 'Family Well-being':
            return 'FAMILY';
        default:
            throw new Error(`Unknown pillar: ${pillar}`);
    }
}

/**
   * Initializes the component, fetching necessary data and setting up initial state.
   */
  ngOnInit():void {
    this.pillar = this.route.snapshot.params['pillar'];
    const params: GetCategoriesByPillar$Params = { pillar: this.mapPillarToParam(this.pillar) };
    this.id = this.route.snapshot.params['id'];
    this.categories = [];

    this.scategories.getCategoriesByPillar(params).subscribe((categoriesOBJ) => {
        //console.log(categoriesOBJ);
        this.categories = categoriesOBJ; });

    this.spillar.getPillar().subscribe((pillars) => {
      this.pillars = pillars;
      let index = this.pillars.findIndex(
        (pillar: { id: string }) => pillar.id == this.id
      );
      if (index > -1) {
        this.pillar = this.pillars[index];
      }
    });
    this.pillarClass = this.getPillarClass(this.mapPillarToParam(this.pillar));
    this.pillarImage = this.getPillarImage(this.mapPillarToParam(this.pillar));
    //console.log(this.pillarClass);
  }

/**
   * Increases the number of visible categories.
   * @param {string} type - The type of categories to show more of ('trending' or undefined).
   */
  showMoreCategories(type: string) {
    if (!type)
      this.visibleCategoriesCount += 5;
    else if (type == "trending")
      this.visibleTrendingCategoriesCount += 5;
  }

/**
   * Navigates to a specific category page.
   * @param {string} pillar - The pillar of the category.
   * @param {string} category - The name of the category.
   * @param {string} id - The ID of the category.
   */
  goToCategory(pillar: string, category: string, id: string) {
    this.router.navigate(['home', pillar, category, id]);
  }

  /**
   * Returns the CSS class name for a given pillar.
   * @param {string} pillar - The pillar to get the class for.
   * @returns {string} The CSS class name for the pillar.
   */
  getPillarClass(pillar: string): string {
    switch (pillar) {
      case 'ECONOMIC':
        return 'economic-class';
      case 'PHYSICAL':
        return 'physical-class';
      case 'PSYCHOLOGICAL':
        return 'psychological-class';
      case 'FAMILY':
        return 'family-class';
      default:
        return '';
    }
  }

  /**
   * Returns the image path for a given pillar.
   * @param {string} pillar - The pillar to get the image for.
   * @returns {string} The image path for the pillar.
   */
  getPillarImage(pillar: string): string {
    switch (pillar) {
      case 'ECONOMIC':
        return '/assets/img/LEONARDO_WELFARE_Campagna_Banner_Ben_Economico.jpg';
      case 'PHYSICAL':
        return '/assets/img/LEONARDO_WELFARE_Campagna_Banner_Ben_Fisico.jpg';
      case 'PSYCHOLOGICAL':
        return '/assets/img/LEONARDO_WELFARE_Campagna_Banner_Ben_Psicologico.jpg';
      case 'FAMILY':
        return '/assets/img/LEONARDO_BF_Banner_Sezione_708x200_02.jpg';
      default:
        return '';
    }
  }
}
