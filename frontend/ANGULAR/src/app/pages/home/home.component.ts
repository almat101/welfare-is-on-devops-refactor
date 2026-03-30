import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PillarService } from '../../services/services';
import { CategoryService } from '../../services/services';
import { UserInfoService } from '../../services/userInfo/user-info.service';
import { UserResponse } from '../../services/models/user-response';

declare var bootstrap: any;

/**
 * Component for the home page functionality.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  /** All categories */
  categories: any;
  /** All pillars */
  pillars: any;
  /** Number of visible categories */
  visibleCategoriesCount = 10;
  /** Number of visible trending categories */
  visibleTrendingCategoriesCount = 10;
  /** Current user information */
  user: UserResponse | null = null;

  /**
   * Constructor for HomeComponent.
   * @param http - HttpClient for making HTTP requests
   * @param router - Router for navigation
   * @param pillar - PillarService for pillar-related operations
   * @param category - CategoryService for category-related operations
   * @param userInfoService - UserInfoService for user-related operations
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private pillar: PillarService,
    private category: CategoryService,
    private userInfoService: UserInfoService
  ) { }

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit():void {
    this.categories = [];
    this.pillar.getPillar().subscribe((pillarOBJ) => {
      this.pillars = pillarOBJ;
      this.pillars[0].image = "/assets/img/LEONARDO-PHYSICAL-WELLBEING-BANNER.png";
      this.pillars[1].image = "/assets/img/LEONARDO-ECONOMIC-WELLBEING-BANNER.png";
      this.pillars[2].image = "/assets/img/LEONARDO-PSYCHOLOGICAL-WELLBEING-BANNER.png";
      this.pillars[3].image = "/assets/img/LEONARDO_BF_News_451x363_02.jpg";
    });
    this.category.getCategories().subscribe((categoriesOBJ) => {
      this.categories = categoriesOBJ;
    });

    this.userInfoService.user$.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.showToast(this.user.saved!);
      }
    });
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
   * Navigates to a specific pillar page.
   * @param pillar - Pillar name
   * @param id - Pillar ID
   */
  goToPillar(pillar: string, id: string) {
    this.router.navigate(['home', pillar, id]);
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
   * Displays a toast notification with the user's saved amount.
   * @param savedAmount - The amount saved by the user
   * @private
   */
  private showToast(savedAmount: number) {
    const savedAmountElement = document.getElementById('savedAmount');
    if (savedAmountElement) {
      savedAmountElement.textContent = savedAmount.toString();
    }

    const toastElement = document.getElementById('savedToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}
