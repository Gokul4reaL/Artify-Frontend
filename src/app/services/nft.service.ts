import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
    providedIn: 'root'
  })
  export class NFTService {
    apiUrl = environment.HOST.link;
  
    constructor(private http: HttpClient) { }

    createNFT(payload: any): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/createNFT', payload, {headers});
    }

    qualityCheck(payload: any): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post(this.apiUrl + '/qualityCheck', payload, {headers});
    }
  }