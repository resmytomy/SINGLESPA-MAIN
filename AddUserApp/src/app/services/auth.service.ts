import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) { }

  register(form: {username: string; password: string,type:string}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/register`, form)
      .pipe(
        tap(response => {
        //     console.log("userName",response.user.username);
        //     sessionStorage.setItem("loggedin",'true');

        //  sessionStorage.setItem("userName",response.user.username);
        //  sessionStorage.setItem("userPassword",response.user.password);
        //  sessionStorage.setItem("userTyp",response.user.type);
        //  sessionStorage.setItem('token', response.accessToken);
        // //  sessionStorage.setItem('refreshToken', response.refreshToken);
        //    this.user$.next(response.user);
        //   this.setToken('token', response.accessToken);
        //   this.setToken('refreshToken', response.refreshToken);
        })
      );
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
    this.user$.next(null);
  }

  // getCurrentUser(): Observable<User> {
  //   return this.user$.pipe(
  //     switchMap(user => {
  //       // check if we already have user data
  //       if (user) {
  //         return of(user);
  //       }

  //       const token = this.localStorageService.getItem('token');
  //       // if there is token then fetch the current user
  //       if (token) {
  //         return this.fetchCurrentUser();
  //       }

  //       return of(null);
  //     })
  //   );
  // }

  // fetchCurrentUser(): Observable<User> {
  //   return this.http.get<User>(`${environment.apiUrl}/current-user`)
  //     .pipe(
  //       tap(user => {
  //         this.user$.next(user);
  //       })
  //     );
  // }

  refreshToken(): Observable<{accessToken: string; refreshToken: string}> {
    const refreshToken = this.localStorageService.getItem('refreshToken');

    return this.http.post<{accessToken: string; refreshToken: string}>(
      `${environment.apiUrl}/refresh-token`,
      {
        refreshToken
      }).pipe(
        tap(response => {
          this.setToken('token', response.accessToken);
          this.setToken('refreshToken', response.refreshToken);
        })
    );
  }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
