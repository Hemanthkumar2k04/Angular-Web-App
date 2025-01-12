import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root', 
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}


  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/login`, { username, password });
  }


  logout(): void {
    localStorage.removeItem('username'); 
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('username'); 
  }
}
