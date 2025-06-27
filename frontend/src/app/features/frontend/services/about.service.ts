import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = 'http://localhost:3000/api/v1/about';
  constructor(private http: HttpClient) {}
  getFirstAbout(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
