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
 

  updateFileContents(data): Observable<string> {
 
    console.log(data);
    // const params = new HttpParams().set('params', data);
    // return this.http.get<string>('http://localhost:8080/edit/'+data);
    return this.http.post<string>('http://localhost:8095/executeCommand ',{'data':data});

  }

}

  
  
  
  