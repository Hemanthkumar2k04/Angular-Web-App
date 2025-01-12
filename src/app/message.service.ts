import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  sendMessage(message:string, user:string | null): Observable<string>{
    return this.http.post<string>(`${this.url}/message`, {message, user});
  }
}
