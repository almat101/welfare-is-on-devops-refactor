
/**
 * @fileoverview This file defines the `httpTokenInterceptor` function, which serves as an HTTP interceptor in Angular applications.
 * The interceptor's primary role is to intercept outgoing HTTP requests and append an Authorization header with a bearer token, if such a token exists.
 * This ensures that all HTTP requests that require authentication are automatically provided with the necessary credentials.
 *  The interceptor utilizes the `TokenService` to access the current user's authentication token and modifies requests accordingly.
 *
 */

/**
 * Intercepts HTTP requests to add an Authorization header with a bearer token, if the token exists.
 * This interceptor is part of the Angular HTTP client's request handling process. When a request is made,
 * this interceptor checks for the presence of an authentication token using the TokenService. If a token is found,
 * it clones the outgoing request to include an Authorization header with the bearer token. This ensures that
 * all outgoing HTTP requests that require authentication are properly authenticated with the server.
 *
 * @param req - The outgoing request object to be intercepted.
 * @param next - The next interceptor in the chain, or the backend if no other interceptors are present.
 * @returns The HTTP event stream.
 */
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../token/token.service';  // Adjust the path as necessary

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const token = tokenService.token;

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};


// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { TokenService } from '../token/token.service'; // Adjust the path as necessary

// export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
//   const tokenService = inject(TokenService);
//   const token = tokenService.token;

//   if (token) {
//     req = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }

//   return next(req);
// };


// import { HttpInterceptorFn } from '@angular/common/http';

// export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

//   return next(req);
// };

// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { TokenService } from '../token/token.service'; // Ensure this service manages your token

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private tokenService: TokenService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = this.tokenService.token; // Method to get the token from your service
//     if (token) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//     }

//     return next.handle(request);
//   }
// }

