import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environment";


@Injectable({
    providedIn: 'root'
  })

export class SharedService {
    apiUrl = environment.HOST.link;

    constructor(private http: HttpClient) { }

    getImages(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(this.apiUrl + '/getImages', {headers});
    }

    uploadImage(payload: any): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/uploadImage', payload, {headers});
    }

    generateImage(payload: any): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/generateImage', payload, {headers});
    }

    getMultiImages(): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get(this.apiUrl + '/multi/getImages', {headers});
    }

    uploadMultiImage(payload: any): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/multi/uploadImage', payload, {headers});
    }

    generateMultiImage(payload: any): Observable<any> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl + '/multi/generateImage', payload, {headers});
    }
}
