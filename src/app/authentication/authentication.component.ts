import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './services/authentication.service';
import { AuthResponse } from './model/auth-resposne.model';
import { Router } from '@angular/router';
import { DynamicComp } from '../shared/dynamic-comp.directive';
import { AlertComponent } from '../shared/alert/alert.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoginMode: boolean = true;
  @ViewChild(NgForm) authForm: NgForm;
  @ViewChild('email') email: ElementRef;
  @ViewChild(DynamicComp) dynamicComp: DynamicComp;
  isLoading: boolean = false;
  closeSubs: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.authService.logout();
  }

  ngAfterViewInit() {
    this.email.nativeElement.focus();
  }

  ngOnDestroy() {
    this.closeSubs.unsubscribe();
  }

  switchMode() {
    this.authForm.reset();
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authService.signUp(this.authForm.value.email, this.authForm.value.password).subscribe((response: AuthResponse) => {
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
        this.handleAlertComponent(error);
      }, () => {
        this.handleAlertComponent(['User Added Successfully!!! Try Login Now.']);
      });
    } else {
      this.authService.login(this.authForm.value.email, this.authForm.value.password).subscribe((response: AuthResponse) => {
        this.router.navigate(['/recipes']);
        this.authService.setAutoLogout(+response.expiresIn * 1000);
      }, error => {
        this.isLoading = false;
        this.handleAlertComponent(error);
      })
    }
  }

  private handleAlertComponent(errorMessage: string[]) {
    const compFactory = this.cfr.resolveComponentFactory(AlertComponent);
    this.dynamicComp.viewContainerRef.clear();
    const component = this.dynamicComp.viewContainerRef.createComponent(compFactory);
    component.instance.messages = errorMessage;
    this.closeSubs = component.instance.close.subscribe(() => {
      this.dynamicComp.viewContainerRef.clear();
      this.closeSubs.unsubscribe();
    });
  }

}
