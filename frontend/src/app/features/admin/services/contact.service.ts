import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl = 'http://localhost:3000/api/v1/contact';
  private replyUrl = 'http://localhost:3000/api/v1/contact/reply-admin';

  constructor(private http: HttpClient) {}

  getAllMessages(): Observable<any> {
    return this.http.get(this.contactUrl);
  }

  replyToMessage(data: { messageId: string; adminReply: string }): Observable<any> {
    return this.http.post(this.replyUrl, data);
  }
}
