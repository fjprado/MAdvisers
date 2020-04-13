import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { MADV_API } from '../../app.api'
import { User } from './user.model';
import { tap, filter } from 'rxjs/operators'
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class LoginService{

    user: User
    lastUrl: string

    constructor(private http: HttpClient, private router: Router){
        this.router.events.pipe(filter (e => e instanceof NavigationEnd))
                          .subscribe( (e: NavigationEnd) => this.lastUrl = e.url)
    }

    isLoggedIn(): boolean{
        return this.user !== undefined
    }

    login(login: string, password: string): Observable<User>{
        return this.http.post<User>(`${MADV_API}/login`, {login: login, password: password})
                        .pipe(tap(user => this.user = user))
    }

    handleLogin(path: string = this.lastUrl){
        this.router.navigate(['/login', btoa(path)])
    }

    logout(){
        this.user = undefined
    }

}
