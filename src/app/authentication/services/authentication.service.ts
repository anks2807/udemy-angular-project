import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from './../model/auth-resposne.model'

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}
    
    signUp(email: string, password: string): Observable<AuthResponse> {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXGKTZh8jKw8D9FEuJK9Sity7NSnIHQRg'
        return this.http.post<AuthResponse>(url, {
            email: email,
            password: password,
            returnSecureToken: true
        });
    }
}