import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { SessionService } from './session.service';
@Injectable({providedIn: 'root'})
export class CanActivateGuard implements CanActivate {
    constructor(private sessionService: SessionService,
         private activatedRoute: ActivatedRoute,
         private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.sessionService.isValidSession() || this.sessionService.isValidStorage()) {
            this.sessionService.reInitializeSession();
            return true; 
        } else {
            this.router.navigate(['login']); 
            return false;
        }
    }
    
    

}