import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions, JsonpModule } from '@angular/http';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
 

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
    console.log(this.http.get<string>('http://192.168.43.195:8080/'));
    return this.http.get<string>('http://localhost:8098/')
  }
  updateFileContents(data): Observable<any> {
    return this.http.post<any>('http://localhost:8098/edit', data)
  }

}

  
  
  
  