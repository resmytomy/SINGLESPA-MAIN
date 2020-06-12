import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CpuDetailsService {
  constructor(private http: HttpClient) {
  }
 getCpuDetails(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/')
  }


}




