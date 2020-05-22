import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, JsonpModule } from '@angular/http';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class cpuDataService {
 
  
 
  constructor(private http: HttpClient) {
  }



  getCpuDetails(): Observable<any> {
    console.log('this....');
    
    return this.http.get<any>('http://localhost:8080/')
  }


}

  
  
  
  