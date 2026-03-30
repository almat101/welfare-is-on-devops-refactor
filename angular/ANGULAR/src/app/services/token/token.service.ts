

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
//   private authState = new BehaviorSubject<boolean>(this.hasToken());

//   constructor(private jwtHelper: JwtHelperService) {}

//   get token(): string | null {
//     return this.getCookie('Authorization');
//   }

//   set token(token: string) {
//     this.setCookie('Authorization', token);
//     this.authState.next(true);
//   }

//   private setCookie(name: string, value: string, days: number = 1) {
//     const expires = new Date();
//     expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
//     document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;
//   }

//   private getCookie(name: string): string | null {
//     const nameEQ = name + "=";
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//       let c = cookies[i];
//       while (c.charAt(0) === ' ') c = c.substring(1);
//       if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
//   }

//   isTokenNotValid(): boolean {
//     return !this.isTokenValid();
//   }

//   isTokenValid(): boolean {
//     const token = this.token;
//     if (!token) {
//       return false;
//     }
//     return !this.jwtHelper.isTokenExpired(token);
//   }

//   removeToken() {
//     this.setCookie('Authorization', '', -1);  // Remove cookie
//     this.authState.next(false);
//   }

//   get isLoggedIn(): Observable<boolean> {
//     return this.authState.asObservable();
//   }

//   private hasToken(): boolean {
//     return !!this.token;
//   }
// }

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { HttpClient } from '@angular/common/http';
// import { tap, map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
//   private authState = new BehaviorSubject<boolean>(this.hasToken());

//   constructor(private http: HttpClient) {}

//   set token(token: string) {
//     localStorage.setItem('token', token);
//     this.authState.next(true);
//   }

//   get token(): string | null {
//     return localStorage.getItem('token');
//   }

//   isTokenNotValid(): boolean {
//     return !this.isTokenValid();
//   }

//   isTokenValid(): boolean {
//     const token = this.token;
//     if (!token) {
//       return false;
//     }
//     const jwtHelper = new JwtHelperService();
//     return !jwtHelper.isTokenExpired(token);
//   }

//   removeToken() {
//     localStorage.removeItem('token');
//     this.authState.next(false);
//   }

//   get isLoggedIn(): Observable<boolean> {
//     return this.authState.asObservable();
//   }

//   private hasToken(): boolean {
//     return !!this.token;
//   }

//   // Check if the token is present in the HTTP-only cookie
//   checkAuth(): Observable<boolean> {
//     return this.http.get<{ token: string }>('/api/auth/check').pipe(
//       tap(response => {
//         if (response && response.token) {
//           this.token = response.token;  // Store in local storage for consistency
// 		  console.log(response.token);
//           this.authState.next(true);
//         } else {
//           this.authState.next(false);
//         }
//       }),
//       map(response => !!response.token)
//     );
//   }
// }

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
//   private authState = new BehaviorSubject<boolean>(this.hasToken());

//   get token(): string | null {
//     // Prefer HTTP-only cookie token if available
//     const token = this.getCookie('token');
//     if (token) {
//       return token;
//     }
//     return localStorage.getItem('token');
//   }

//   set token(token: string) {
//     localStorage.setItem('token', token);
//     this.authState.next(true);
//   }

//   isTokenNotValid(): boolean {
//     return !this.isTokenValid();
//   }

//   isTokenValid(): boolean {
//     const token = this.token;
//     if (!token) {
//       return false;
//     }
//     // Decode token
//     const jwtHelper = new JwtHelperService();
//     // Check expiration
//     const isTokenExpired = jwtHelper.isTokenExpired(token);
//     if (isTokenExpired) {
//       localStorage.clear();
//       return false;
//     }
//     return true;
//   }

//   removeToken() {
//     localStorage.removeItem('token');
//     this.authState.next(false);
//   }

//   get isLoggedIn(): Observable<boolean> {
//     return this.authState.asObservable();
//   }

//   private hasToken(): boolean {
//     return !!this.token;
//   }

//   private getCookie(name: string): string | null {
// 	console.log('getCookie');
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
// 	console.log(value, "value is here");
//     if (parts.length === 2) return parts.pop()!.split(';').shift()!;
//     return null;
//   }
// }

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';

// @Injectable({
//   providedIn: 'root'
// })
// export class TokenService {
//   private authState = new BehaviorSubject<boolean>(this.hasToken());

//   set token(token: string) {
//     localStorage.setItem('token', token);
//     this.authState.next(true);
//   }

//   get token(): string | null {
//     return localStorage.getItem('token');
//   }

//   isTokenNotValid(): boolean {
//     return !this.isTokenValid();
//   }

//   isTokenValid(): boolean {
//     const token = this.token;
//     if (!token) {
//       return false;
//     }
//     const jwtHelper = new JwtHelperService();
//     return !jwtHelper.isTokenExpired(token);
//   }

//   removeToken() {
//     localStorage.removeItem('token');
//     this.authState.next(false);
//   }

//   get isLoggedIn(): Observable<boolean> {
//     return this.authState.asObservable();
//   }

//   private hasToken(): boolean {
//     return !!localStorage.getItem('token');
//   }
// }

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  set token(token: string) {
    localStorage.setItem('token', token);
    this.authState.next(true);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isTokenNotValid(): boolean {
	return !this.isTokenValid();

  }

  isTokenValid(): boolean {
	const token = this.token;
	if (!token) {
		return false;
	}
	//decode token
	const  jwtHelper = new JwtHelperService();
	//check expiration
	const isTokenExpired = jwtHelper.isTokenExpired(token);
	if (isTokenExpired) {
		localStorage.clear();
		return false;
	}
	return true;
  }

  removeToken() {
    localStorage.removeItem('token');
    this.authState.next(false);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.authState.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
