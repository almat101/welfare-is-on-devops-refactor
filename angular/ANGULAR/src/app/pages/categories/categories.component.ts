import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetNewArrival$Params } from '../../services/fn/product/get-new-arrival';
import { GetTopSelling$Params } from '../../services/fn/product/get-top-selling';
import { CategoryService, ProductService } from '../../services/services';

/**
 * Component for handling category-related functionality.
 */

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  /** Top selling products */
  top_products: any;
  /** New products */
  new_products: any;
  /** Discounted products */
  discounted_products: any;
  /** All categories */
  categories: any;
  /** Current category */
  category: any;
  /** Pillar class */
  pillarClass: any;
  /** Type parameter */
  type = '';
  /** ID parameter */
  id = '';
  /** Pillars */
  pillars: any;
  /** Number of visible categories */
  visibleCategoriesCount = 10;
  /** Number of visible trending categories */
  visibleTrendingCategoriesCount = 10;

  /**
   * Constructor for CategoriesComponent.
   * @param http - HttpClient for making HTTP requests
   * @param router - Router for navigation
   * @param route - ActivatedRoute for accessing route parameters
   * @param sproduct - ProductService for product-related operations
   * @param scategories - CategoryService for category-related operations
   */
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private sproduct: ProductService, private scategories: CategoryService) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit():void {
    this.pillarClass = this.route.snapshot.params['pillar'];
    this.category = this.route.snapshot.params['category'];
    this.getDiscountedProducts();
    this.getTopProducts();
    this.getNewProducts();
    this.categories = [];
    this.getCategories();
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
  }

  /**
   * Fetches discounted products for the current category.
   */
  getDiscountedProducts() {
    const categoryString = String(this.category);
    const params: GetNewArrival$Params = { category: categoryString.toUpperCase()};
    this.sproduct.getNewArrival(params).subscribe((productOBJ) => {
      this.discounted_products = productOBJ;
    })
  }

  /**
   * Fetches new products for the current category.
   */
  getNewProducts() {
    const categoryString = String(this.category);
    const params: GetNewArrival$Params = { category: categoryString.toUpperCase()};
    this.sproduct.getNewArrival(params).subscribe((productOBJ) => {
      this.new_products = productOBJ;
    })
  }

  /**
   * Fetches top selling products for the current category.
   */
  getTopProducts() {
    const categoryString = String(this.category);
    const params: GetTopSelling$Params = { category: categoryString.toUpperCase()};
    this.sproduct.getTopSelling(params).subscribe((productOBJ) => {
      this.top_products = productOBJ;
    })
  }

  /**
   * Increases the number of visible categories.
   * @param type - Type of categories to show more of ('trending' or undefined)
   */
  showMoreCategories(type: string) {
    if (!type)
      this.visibleCategoriesCount += 5;
    else if (type == "trending")
      this.visibleTrendingCategoriesCount += 5;
  }

  /**
   * Navigates to a specific category page.
   * @param pillar - Pillar of the category
   * @param category - Category name
   * @param id - Category ID
   */
  goToCategory(pillar: string, category: string, id: string) {
    this.router.navigate(['home', pillar, category, id]);
  }

  /**
   * Navigates to a specific route.
   * @param route - Route to navigate to
   */
  goTo(route: string) {
    this.router.navigate([route]);
  }

  /**
   * Navigates to a specific product page.
   * @param product - Product name
   * @param id - Product ID
   */
  goToProduct(product: string, id: string) {
    this.router.navigate(['home', 'prodotti', product, id])
  }

  /**
   * Fetches all categories and sets the current category.
   */
  getCategories() {
    this.scategories.getCategories().subscribe((categories) => {
      this.categories = categories;
      let index = this.categories.findIndex(
        (category: { id: string }) => category.id == this.id
      );
      if (index > -1) {
        this.category = this.categories[index];
      }
    });
  }
}
