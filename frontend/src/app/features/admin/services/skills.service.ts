

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod'
@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private apiUrl = `https://aya-anwar-portfolio-danr.vercel.app/api/v1/skill`;

  constructor(private http: HttpClient) {}

  getAllSkills(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSkill(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateSkill(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteSkill(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
