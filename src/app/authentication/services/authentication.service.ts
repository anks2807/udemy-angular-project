import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthResponse } from './../model/auth-resposne.model'
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
    
    constructor(private http: HttpClient) {}
    
    signUp(email: string, password: string): Observable<AuthResponse> {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXGKTZh8jKw8D9FEuJK9Sity7NSnIHQRg'
        return this.http.post<AuthResponse>(url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(error => this.handleError(error)));
        
    }

    login(email: string, password: string): Observable<AuthResponse> {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXGKTZh8jKw8D9FEuJK9Sity7NSnIHQRg';
        return this.http.post<AuthResponse>(url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError));
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