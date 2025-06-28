import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private apiUrl = `${environment.apiUrl}/about`;
  constructor(private http: HttpClient) {}
  getFirstAbout(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
