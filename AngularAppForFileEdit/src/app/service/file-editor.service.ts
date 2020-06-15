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
    
    return this.http.get<string>('http://localhost:8098/')
  }
  updateFileContents(data): Observable<string> {

    return this.http.post<string>('http://localhost:8098/edit/',{'data':data});

  }
}
