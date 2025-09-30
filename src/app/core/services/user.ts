import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  login(payload: LoginPayload): Observable<{ Token: string }> {
    return this.http.post<{ Token: string }>(`${this.base}/Login`, payload).pipe(
      tap(res => {
        if (res?.Token) localStorage.setItem('auth_token', res.Token);
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
}