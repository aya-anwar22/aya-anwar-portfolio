import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod'
 
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `https://aya-anwar-portfolio-danr.vercel.app/api/v1/project`;

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
