import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './services/authentication.service';
import { AuthResponse } from './model/auth-resposne.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [AuthService]
})
export class AuthenticationComponent implements OnInit, AfterViewInit {
  isLoginMode: boolean = true;
  @ViewChild(NgForm) authForm: NgForm;
  @ViewChild('email') email: ElementRef;
  isError: boolean = false;
  isLoading: boolean = false;
  userAdded: boolean = false;
  constructor(private authService: AuthService) { }

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
      }, (error: HttpErrorResponse) => {
        this.isError = true;
        this.isLoading = false;
      }, () => {
        this.authForm.reset();
        setTimeout(() => {
            this.userAdded = false;
        }, 3000);
      });
    }
    
  }

}
