import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileEditorService {


  constructor(private http: HttpClient) {
  }
  
  getfileContent(): Observable<string> {
    console.log('inside file get ')
    
    return this.http.get<string>('http://localhost:8000/fileContent')
  }
  updateFileContents(data): Observable<string> {

    return this.http.post<string>('http://localhost:8000/writeFile',{'data':data});

  }
}
