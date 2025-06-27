// src/app/services/social-media.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialLinkService {
  private apiUrl = 'http://localhost:3000/api/v1/social-links';

  constructor(private http: HttpClient) {}

  getSocialLinks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSocialLink(data: { platform: string; url: string }): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateSocialLink(id: string, data: { platform: string; url: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteSocialLink(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
