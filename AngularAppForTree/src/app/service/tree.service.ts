import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  constructor(private http: HttpClient) {
  }



  getHardWareDetails(): Observable<any> {
    console.log('this....');
    
    return this.http.get<any>('http://localhost:8885/')
  }


}
