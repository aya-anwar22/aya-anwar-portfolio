import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from '../../../../environments/environment.prod'


@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiUrl = `https://aya-anwar-portfolio-danr.vercel.app/api/v1/education`;

  constructor(private http: HttpClient) {}
  getAllEducations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }


}
