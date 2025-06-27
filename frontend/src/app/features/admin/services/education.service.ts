import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiUrl = 'http://localhost:3000/api/v1/education';

  constructor(private http: HttpClient) {}

  createEducation(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getFirstEducation(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateEducation(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
  getAllEducations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteEducation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
