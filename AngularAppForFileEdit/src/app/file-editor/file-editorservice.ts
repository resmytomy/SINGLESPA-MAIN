import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, JsonpModule } from '@angular/http';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class fileEditorService {
 
  
 
  constructor(private http: HttpClient) {
  }
 
//  getfileContent(): Observable<any> {
//     return this.http.get(this.baseURL +'view').
//     pipe(map((res: Response) => res.json()),
//       catchError(<T>(error: any, result?: T) => {
//         return of(result as T);
//       })
//     );
//   }
// getfileContent(): Observable<any> {

// return this.http.get('https://api.github.com/users/seeschweiler').subscribe(data => {
//       console.log(data);
//     });
//   }



  getfileContent(): Observable<string> {
    console.log('this....');
    
    return this.http.get<string>('http://localhost:8098/')
  }
  updateFileContents(data): Observable<string> {
    var headers1 = new Headers();
headers1.append('header', 'value');
    console.log('this.... eiting' + data ); 
    // const params = new HttpParams().set('params', data);
    // return this.http.get<string>('http://localhost:8080/edit/'+data);
    return this.http.post<string>('http://localhost:8098/edit/ ',{'data':data});

  }

}

  
  
  
  