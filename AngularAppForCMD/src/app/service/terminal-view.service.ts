import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, JsonpModule } from '@angular/http';

import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class TermnalViewService {
 
  
 
  constructor(private http: HttpClient) {
  }
 

  executeCOmmand(data): Observable<string> {
    console.log('inside nnnnn')
    return this.http.post<string>('http://localhost:8000/executeCommand',{'data':data});

  }

}

  
  
  
  