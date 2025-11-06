/* import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

     if (typeof window === 'undefined') return true;
    const token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/home']);
      console.log("Token found, redirecting to home: " + token);
      return false;
    }
    console.log("No token found, allowing access to login page");
    return true;
  }
}
 */