import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  lastToken: string = ''
  loginUrl: string = `${this.config.apiUrl}login` // a /login-ra kell küldeni egy post-ot az email+password-del
    
  constructor(
    private config: ConfigService,
    private http: HttpClient,
    private router: Router
  ) {
    if (localStorage.currentUser) { // induláskor megnézzük, hogy be volt-e már jelentkezve
      const user: User = JSON.parse(localStorage.currentUser)
      this.lastToken = user.accessToken || ''
      this.currentUserSubject$.next(user)
    }
  }

  login(loginData: User): Observable<User | null> { // ha nem sikerült belépni, akkor null lesz
    return this.http.post<{ user: User, accessToken: string }>(
      this.loginUrl, loginData
    ).pipe(
      map(response => {
        if (response.user && response.accessToken) {  // minden van, ami kell
          this.lastToken = response.accessToken
          response.user.accessToken = response.accessToken
          this.currentUserSubject$.next(response.user) // a feliratkozók is megkapják a user-t
          localStorage.currentUser = JSON.stringify(response.user)
          return response.user
        }
        return null
    })
    )
  }

  logout(): void {
    this.lastToken = ''
    this.currentUserSubject$.next(null)
    localStorage.removeItem('currentUser')
    this.router.navigate(['/login'])
  }
}
