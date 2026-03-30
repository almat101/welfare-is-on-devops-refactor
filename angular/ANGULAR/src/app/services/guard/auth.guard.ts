
/**
 * @fileoverview This file defines the `authGuard` function, which is used as a guard in Angular routing to protect routes that require authentication.
 * The guard checks if the user's authentication token is valid by using the `TokenService`. If the token is not valid, the user is redirected to the preview page,
 *  effectively preventing access to protected routes for unauthenticated users.
 *
 */
import { CanActivateFn , Router} from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../token/token.service';

export const authGuard: CanActivateFn = () => {
	const tokenService = inject(TokenService);
	const router = inject(Router);
	if (tokenService.isTokenNotValid()) {
		// Redirect to the preview page if the token is not valid
		router.navigate(['/preview']);
		return false;
	}
  return true;
};
