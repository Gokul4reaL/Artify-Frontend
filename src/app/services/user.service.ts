import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.HOST.link;

  constructor(private http: HttpClient) { }

  register(payload: any): Observable<any> {
    return this.http.post(this.apiUrl + '/register', payload);
  }

  login(payload: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', payload);
  }

  createProfile(payload: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/createProfile', payload, {headers});
  }

  checkUserName(payload: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/checkUserName', payload, {headers});
  }

  uploadPhoto(payload: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/upload', payload, {headers});   
  }
}
