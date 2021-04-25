import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs';
import { SessionService, SESSION_KEYS } from './session.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private sessionService: SessionService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('signInWithPassword') || req.url.includes('signUp')) {
            return next.handle(req);
        }
        if (this.sessionService.isValidSession()) {
            let modifiedReq = req.clone({
                params: new HttpParams().set('auth', this.sessionService.get(SESSION_KEYS.ACCESS_TOKEN))
            });
            return next.handle(modifiedReq);
        }
    }

}