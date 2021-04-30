import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { AuthResponse } from './../model/auth-resposne.model'
import { catchError, tap } from 'rxjs/operators';
import { SessionService, SESSION_KEYS } from 'src/app/shared/session.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
@Injectable()
export class AuthService {

    private loginSuccessful = new Subject<{email: string, accessToken: string}>();
    private autoLogoutTimeout: any
    constructor(private http: HttpClient, private sessionService: SessionService,
        private router: Router) {}
    
    signUp(email: string, password: string): Observable<AuthResponse> {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`;
        return this.http.post<AuthResponse>(url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(error => this.handleError(error)));
        
    }

    login(email: string, password: string): Observable<AuthResponse> {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`;
        return this.http.post<AuthResponse>(url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(response => this.setLoginInfo(response)));
    }

    setLoginInfo(response: AuthResponse) {
        this.sessionService.set(SESSION_KEYS.ACCESS_TOKEN, response.idToken);
        this.sessionService.set(SESSION_KEYS.REFRESH_TOKEN, response.refreshToken);
        this.sessionService.set(SESSION_KEYS.USER_INFO, response.email);
        this.sessionService.set(SESSION_KEYS.EXPIRE_IN, new Date(new Date().getTime() + +response.expiresIn * 1000));
        this.loginSuccessful.next({email: response.email, accessToken: response.idToken});
    }

    triggerLogin(info: {email: string, accessToken: string}) {
        this.loginSuccessful.next(info);
    }

    getLoginInfo(): Observable<{email: string, accessToken: string}> {
        return this.loginSuccessful.asObservable();
    }


    logout() {
        this.sessionService.clear();
        this.loginSuccessful.next(null);
    }

    setAutoLogout(expireTime: number) {
        this.autoLogoutTimeout = setTimeout(() => {
          this.logout();
          this.router.navigate(['login']);
        }, expireTime);
    }

    getAutoLogoutTimer() {
        return this.autoLogoutTimeout;
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage: string[] = [];
        // window.console.log(error);
        if (error && error.error && error.error.error) {
            error.error.error.errors.forEach(el => {
                 if (el.message === 'EMAIL_EXISTS') {
                     errorMessage.push('Email Already Exists!');
                 } else if (el.message === 'EMAIL_NOT_FOUND') {
                    errorMessage.push('Email Not Found!');
                 } else if (el.message === 'INVALID_PASSWORD') {
                    errorMessage.push('Password is Invalid!')
                 }
            });

            if (errorMessage.length === 0) {
                errorMessage.push('An Error Occured!');
            }
        }
        return throwError(errorMessage)
    }
}