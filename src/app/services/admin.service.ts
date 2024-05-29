import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.HOST.link;

  constructor(private http: HttpClient) { }

  register(payload: any): Observable<any> {
    return this.http.post(this.apiUrl + '/admin/register', payload);
  }

  login(payload: any): Observable<any> {
    return this.http.post(this.apiUrl + '/admin/login', payload);
  }

  createProfile(payload: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/admin/createProfile', payload, {headers});
  }

  checkUserName(payload: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/admin/checkUserName', payload, {headers});
  }

  getNFTS(): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + '/admin/getNFTS', {headers});
  }

  getAuctions(): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl + '/admin/getAuctions', {headers});
  }

  createAuctions(payload: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/admin/createAuctions', payload, {headers});
  }

  addToAuction(payload: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/admin/addToAuction', payload, {headers});   
  }

  startAuction(payload: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/admin/startAuction', payload, {headers});
  }

  endAuction(payload: any): Observable<any> {
    const token = localStorage.getItem('adminToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl + '/admin/endAuction', payload, {headers});  }
}