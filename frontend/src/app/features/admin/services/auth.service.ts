// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = 'https://aya-anwar-portfolio-danr.vercel.app/api/v1/auth';

  constructor(private http: HttpClient) {}

  // تسجيل الدخول وتخزين التوكنات
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.api}`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }

  // تجديد التوكن تلقائيًا باستخدام الريفرش توكن
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(`${this.api}/refresh-token`, { refreshToken }).pipe(
      tap((res: any) => {
        localStorage.setItem('accessToken', res.accessToken);
      })
    );
  }

  // تسجيل الخروج وحذف التوكنات
  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(`${this.api}/logout`, { refreshToken }).pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      })
    );
  }

  // جلب التوكن الحالي
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // جلب الريفرش توكن الحالي
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  // التأكد من حالة الدخول
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }
}
