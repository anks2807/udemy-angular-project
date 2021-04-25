import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './services/authentication.service';
import { AuthResponse } from './model/auth-resposne.model';
import { SessionService, SESSION_KEYS } from '../shared/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, AfterViewInit {
  isLoginMode: boolean = true;
  @ViewChild(NgForm) authForm: NgForm;
  @ViewChild('email') email: ElementRef;
  isError: boolean = false;
  isLoading: boolean = false;
  userAdded: boolean = false;
  errorMessages: string[];
  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.email.nativeElement.focus();
  }

  switchMode() {
    this.authForm.reset();
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    this.isError = false;
    this.isLoading = true;
    if (!this.isLoginMode) {
      this.authService.signUp(this.authForm.value.email, this.authForm.value.password).subscribe((response: AuthResponse) => {
        if (response) {
          this.userAdded = true;
          window.console.log(response);
        }
        this.isLoading = false;
      }, (error) => {
        this.isError = true;
        this.isLoading = false;
        this.errorMessages = error;
      }, () => {
        setTimeout(() => {
            this.userAdded = false;
        }, 2000);
      });
    } else {
      this.authService.login(this.authForm.value.email, this.authForm.value.password).subscribe((response: AuthResponse) => {
        this.router.navigate(['/recipes']);
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.isError = true;
        this.errorMessages = error;
      })
    }
    
  }

}
