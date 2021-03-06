import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { User } from './user.interface';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient,
             ) { }

  login(form: {username: string; password: string}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8000/login', form)
      .pipe(
        tap(response => {
          sessionStorage.setItem("userName",response.user.username);
          sessionStorage.setItem("userPassword",response.user.password);
          sessionStorage.setItem("userTyp",response.user.type);
          sessionStorage.setToken('token', response.accessToken);
          sessionStorage.setToken('refreshToken', response.refreshToken);
          this.user$.next(response.user);
          this.setToken('token', response.accessToken);
          this.setToken('refreshToken', response.refreshToken);
        })
      );
  }

  logout(): void {
    sessionStorage.removeItem('token');
   sessionStorage.removeItem('refreshToken');
    this.user$.next(null);
  }

  getCurrentUser(): Observable<User> {
    return this.user$.pipe(
      switchMap(user => {
        // check if we already have user data
        if (user) {
          return of(user);
        }

        const token = sessionStorage.getItem('token');
        // if there is token then fetch the current user
        if (token) {
          return this.fetchCurrentUser();
        }

        return of(null);
      })
    );
  }

  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8000/current-user')
      .pipe(
        tap(user => {
          this.user$.next(user);
        })
      );
  }

  refreshToken(): Observable<{accessToken: string; refreshToken: string}> {
    const refreshToken = sessionStorage.getItem('refreshToken');

    return this.http.post<{accessToken: string; refreshToken: string}>(
      'http://localhost:8000/refresh-token',
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
    sessionStorage.setItem(key, token);
  }
}
