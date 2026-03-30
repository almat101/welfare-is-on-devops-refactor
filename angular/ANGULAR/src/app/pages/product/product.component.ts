
/**
 * @fileoverview This file defines the ProductComponent class within an Angular application, focusing on individual product functionality.
 * It is responsible for displaying detailed product information, handling user interactions such as liking a product, and managing sales operations.
 * The component imports necessary Angular modules and services, including CommonModule for common directives, ActivatedRoute and Router for navigation, HttpClient for HTTP requests, and various custom services and functions for product-related operations.
 * The ProductComponent is designed as a standalone component, showcasing its ability to operate independently within the application architecture, enhancing modularity and reusability.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductService, SaleService } from '../../services/services';
import { GetProduct$Params } from '../../services/fn/product/get-product';
import { RegisterSale$Params } from '../../services/fn/sale/register-sale';
import { ProductResponse } from '../../services/models/product-response';
import { UserInfoService } from '../../services/userInfo/user-info.service';
import { Like$Params , like } from '../../services/fn/interaction/like';
declare var bootstrap: any;

/**
 * The ProductComponent is a key element of the e-commerce functionality within the application, dedicated to presenting detailed views of individual products.
 * It integrates various Angular modules and services to provide a rich user experience, including displaying product details, facilitating the liking of products, and handling purchase operations.
 * Through its interaction with the ProductService and SaleService, it retrieves product data and manages sales transactions, respectively. The component also supports user interaction features such as liking a product, which is achieved through the like function.
 *  Its design as a standalone component with its own routing and HTTP service integration underscores its modular and reusable nature, making it an essential part of the application's product management and user engagement strategy.
 */

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})

/**
 * Component for handling individual product functionality.
 */
export class ProductComponent implements OnInit {
  /** Current product */
  product: ProductResponse | undefined;
  /** Product ID */
  id: string = '';
  /** List of products */
  products: ProductResponse[] = [];
  /** Object to track favorite state of products */
  favoriteState: { [key: number]: number } = {};

  /**
   * Constructor for ProductComponent.
   * @param http - HttpClient for making HTTP requests
   * @param router - Router for navigation
   * @param route - ActivatedRoute for accessing route parameters
   * @param productService - ProductService for product-related operations
   * @param saleService - SaleService for sale-related operations
   * @param userInfoService - UserInfoService for user-related operations
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private saleService: SaleService,
    private userInfoService: UserInfoService,
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.products = [];
    this.getProduct();
  }

  /**
   * Fetches the product details based on the current product ID.
   */
  getProduct(): void {
    const params: GetProduct$Params = { 'product-id': Number(this.id) };
    this.productService.getProduct(params).subscribe({
      next: (response) => {
        this.products = [response];
      },
      error: (error) => {
        console.error('Error fetching product:', error);
      }
    });
  }

  /**
   * Registers a purchase for a product.
   * @param productId - ID of the product to purchase
   * @param quantity - Quantity of the product to purchase
   */
  purchase(productId: number, quantity: number): void {
    const paramsForSale: RegisterSale$Params = { body: { productId, quantity } };
    this.saleService.registerSale(paramsForSale).subscribe((response) => {
      console.log('Sale registered:', response)
      this.userInfoService.updateUserInfo();
      this.showToast();
    });
  }

  /**
   * Toggles the favorite status of a product.
   * @param productId - ID of the product to favorite/unfavorite
   */
  favourite(productId: number): void {
    const params: Like$Params = { productId };
    like(this.http, this.productService.rootUrl, params).subscribe({
      next: (response) => {
        let isFav = response.body;
        this.favoriteState[productId] = isFav;
        const message = isFav ? 'Aggiunto ai preferiti' : 'Rimosso dai preferiti';
        this.showToast(message);
      },
      error: (error) => {
        console.error('Error adding product to favorites:', error);
      }
    });
  }

  /**
   * Displays a toast notification with a given message.
   * @param message - Message to display in the toast (default is 'Acquisto avvenuto!')
   */
  showToast(message: string = 'Acquisto avvenuto!') {
    const toastElement = document.getElementById('purchaseToast');
    if (toastElement) {
      toastElement.querySelector('.toast-body')!.textContent = message;
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }
}

// import { Component } from '@angular/core';
// import { ProductService, SaleService } from '../../services/services';
// import { ActivatedRoute, Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { GetProduct1$Params } from '../../services/fn/product/get-product-1';
// import { RegisterSale$Params } from '../../services/fn/sale/register-sale';


// @Component({
//   selector: 'app-product',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './product.component.html',
//   styleUrl: './product.component.scss'
// })
// export class ProductComponent {
//   product: any;
//   id = '';
//   products: any;

//   constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private sproduct: ProductService, private ssales: SaleService) {}

//   ngOnInit():void {
//     this.id = this.route.snapshot.params['id'];
//     this.products = [];
//     this.getProduct();
//   }

//   getProduct() {
//     const params: GetProduct1$Params = {'product-id': Number(this.id)};
//     this.sproduct.getProduct1(params).subscribe((products) => {
//       this.products = products;
//       console.log(this.products);
//     });
//   }

//   Purchase(id: number, quantity: number) {
//     const params_for_sale: RegisterSale$Params = {'body': {productId: Number(this.id), quantity: 1}};
//     this.ssales.registerSale(params_for_sale).subscribe();
//   }
// }

