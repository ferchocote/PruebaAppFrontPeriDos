// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7145/Api/Authentication';
  private tokenKey = 'authToken';

  currentUser$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  login(credentials: { user: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser$.next(null);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}
