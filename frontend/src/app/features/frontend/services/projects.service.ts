import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = `https://aya-anwar-portfolio-danr.vercel.app/api/v1/project`;

  constructor(private http: HttpClient) {}
  getAllProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
