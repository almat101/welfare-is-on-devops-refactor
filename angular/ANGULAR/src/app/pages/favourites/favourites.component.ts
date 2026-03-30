/**
 * @fileoverview This file defines the FavouritesComponent which is responsible for managing and displaying
 * the user's favourite products in the application. It utilizes services for interactions, product management,
 * sales, and user information to fetch and manipulate favourite products data.
 */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InteractionService } from '../../services/services';
import { ProductService, SaleService } from '../../services/services';
import { GetProduct$Params } from '../../services/fn/product/get-product';
import { RegisterSale$Params } from '../../services/fn/sale/register-sale';
import { ProductResponse } from '../../services/models/product-response';
import { UserInfoService } from '../../services/userInfo/user-info.service';
import { Like$Params , like } from '../../services/fn/interaction/like';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
// import { GetFavorites$Params, getFavorites } from '../../services/fn/interaction/get-favorites';
declare var bootstrap: any;


/**
 * Component for displaying and managing user's favourite products.
 * It allows users to view their favourite products and interact with them
 * through the provided services.
 */
@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent {

		/**
	 * Stores the favourite products fetched from the service.
	 */
	favourite_products: any;

	/**
   * Holds the detail of a single product, used for displaying or manipulation.
   */
	product: ProductResponse | undefined;

	/**
   * The identifier for a product, used in fetching or operations on a single product.
   */
	id: string = '' ;

	/**
    * An array of ProductResponse objects, representing multiple products.
    */
	products: ProductResponse[] = [];

	/**
   * An object that holds the state of a product being a favourite or not.
   */
	favoriteState: { [key: number]: number } = {};

	/**
	 * Constructs a new instance of the FavouritesComponent.
	 *
	 * @param interaction Provides methods to enable interaction across components.
	 * @param http Handles HTTP requests.
	 * @param router Provides the navigation and url manipulation capabilities.
	 * @param route Holds information about the route linked with this component.
	 * @param productService Manages operations related to products.
	 * @param saleService Manages sales operations.
	 * @param userInfoService Manages user information operations.
	 */

	constructor(
		private interaction: InteractionService,
		private http: HttpClient,
		private router: Router,
		private route: ActivatedRoute,
		private productService: ProductService,
		private saleService: SaleService,
		private userInfoService: UserInfoService,

	) { }

	/**
	 * Initializes the component by fetching the favourite products.
	 */
	ngOnInit():void {
		this.getFavouriteProducts();
	}

	/**
	 * Fetches the favourite products from the service and assigns them to the `favourite_products` property.
	 * Utilizes the `interaction` service to retrieve the favourite products and subscribes to the observable returned by `getFavorites`.
	 * Upon receiving the products, it assigns them to the `favourite_products` property of the component.
	 */
	getFavouriteProducts() {
		this.interaction.getFavorites().subscribe((productOBJ) => {
		this.favourite_products = productOBJ;
		//console.log(this.favourite_products);
		})
	}

	/**
	 * Initiates the purchase process for a product by its ID and the specified quantity.
	 *
	 * This method constructs the parameters required for registering a sale, then calls
	 * the `registerSale` method of the `saleService`. Upon successful registration of the sale,
	 * it updates the user's information and displays a toast notification.
	 *
	 * @param {number} productId - The unique identifier of the product to be purchased.
	 * @param {number} quantity - The quantity of the product to be purchased.
	 */
	purchase(productId: number, quantity: number): void {
		const paramsForSale: RegisterSale$Params = { body: { productId, quantity } };
		this.saleService.registerSale(paramsForSale).subscribe((response) => {
			//console.log('Sale registered:', response)
			this.userInfoService.updateUserInfo();
			this.showToast();
		});
	}


	/**
	 * Toggles the favorite state of a product by its ID.
	 *
	 * This method sends a request to either add or remove a product from the user's favorites.
	 * Upon success, it updates the local `favoriteState` to reflect the new state of the product
	 * (i.e., whether it is now a favorite or not). It then displays a toast message to inform the
	 * user of the action's result.
	 * Optionally, the method includes a commented-out line for
	 * reloading the page, which can be used if immediate visual feedback in the UI is required.
	 *
	 * @param {number} productId - The unique identifier of the product to toggle in favorites.
	 */
	favourite(productId: number): void {
		const params: Like$Params = { productId };
		like(this.http, this.productService.rootUrl, params).subscribe({
		next: (response) => {
			let isFav = response.body;
			this.favoriteState[productId] = isFav;
			const message = isFav ? 'Aggiunto ai preferiti' : 'Rimosso dai preferiti';
			this.showToast(message);

			// window.location.reload(); serve che ricarichi la pagina?
		},
		error: (error) => {
			console.error('Error adding product to favorites:', error);
		}
		});
	}

	/**
	 * Displays a toast notification with a custom message.
	 *
	 * This method looks for an HTML element with the ID 'purchaseToast' and sets its text content
	 * to the provided message. It then creates and shows a Bootstrap toast notification using
	 * the found element. If the element with the specified ID does not exist, the method does nothing.
	 *
	 * @param {string} message - The message to be displayed in the toast notification. Defaults to 'Acquisto avvenuto!' if no message is provided.
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
