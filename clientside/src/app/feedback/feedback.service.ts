import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private apiUrl = 'http://localhost:8080/api/feedback';

  constructor(private http: HttpClient) {}

  saveFeedback(feedback: any): Observable<any> {
    return this.http.post(this.apiUrl, feedback);
  }

  getFeedbacks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
