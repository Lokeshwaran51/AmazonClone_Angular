import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Token } from '@angular/compiler';

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  mobile: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly base = 'https://localhost:7091/api/User';

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<string> {
    return this.http.post<string>(`${this.base}/Register`, payload);
  }

  login(payload: LoginPayload): Observable<{ token: string }> {
    
    return this.http.post<{ token: string }>(`${this.base}/Login`, payload).pipe(
      tap(res => {
        //console.log("token: "+ res.token);
        if (res?.token) 
          localStorage.setItem('auth_token', res.token);
      })
    );
  } 

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  get token(): string | null {
    return localStorage.getItem('auth_token');
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  googleLogin(payload: any) {
  return this.http.post<any>('https://localhost:7091/api/auth/google-login', payload);
}
}