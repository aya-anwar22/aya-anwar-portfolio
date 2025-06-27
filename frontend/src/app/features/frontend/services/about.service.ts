import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = 'https://aya-anwar-portfolio-danr.vercel.app/api/v1/about';
  constructor(private http: HttpClient) {}
  getFirstAbout(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
