import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { SessionService, SESSION_KEYS } from './session.service';
import { AuthService } from '../authentication/services/authentication.service';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private sessionService: SessionService,
         private route: Router, private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('signInWithPassword') || req.url.includes('signUp')) {
            return next.handle(req);
        }
        let modifiedReq;
        if (this.sessionService.isValidSession()) {
            this.authService.triggerLogin(
                {email: this.sessionService.get(SESSION_KEYS.USER_INFO), 
                    accessToken: this.sessionService.get(SESSION_KEYS.ACCESS_TOKEN)});
            modifiedReq = req.clone({
                params: new HttpParams().set('auth', this.sessionService.get(SESSION_KEYS.ACCESS_TOKEN))
            });
            return next.handle(modifiedReq);
        } else if (this.sessionService.isValidStorage()) {
            this.sessionService.reInitializeSession();
            this.authService.triggerLogin(
                {email: this.sessionService.get(SESSION_KEYS.USER_INFO), 
                    accessToken: this.sessionService.get(SESSION_KEYS.ACCESS_TOKEN)});
            modifiedReq = req.clone({
                params: new HttpParams().set('auth', this.sessionService.get(SESSION_KEYS.ACCESS_TOKEN))
            });
            return next.handle(modifiedReq);
        } else {
            this.sessionService.clear();
            this.route.navigate(['login']);
        }
    }

}