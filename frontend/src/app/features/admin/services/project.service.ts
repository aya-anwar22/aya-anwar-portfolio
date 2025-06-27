import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/v1/project';

  constructor(private http: HttpClient) {}

  createProject(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  getAllProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateProject(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
