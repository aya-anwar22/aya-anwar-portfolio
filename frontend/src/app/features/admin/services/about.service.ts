import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = 'http://localhost:3000/api/v1/about';

  constructor(private http: HttpClient) {}

  createAbout(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getFirstAbout(): Observable<any> {
    return this.http.get(this.apiUrl);
  }


  updateAbout(id: string, formData: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, formData);
}

deleteAbout(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
