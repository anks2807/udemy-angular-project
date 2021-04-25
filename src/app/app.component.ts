import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './authentication/services/authentication.service';
import { SessionService } from './shared/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Recipe Shopping';
  isLoggedIn: boolean = false;
  userInfo: string;
  subscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.getLoginInfo().subscribe(data => {
      if (data && data.email) {
        this.isLoggedIn = true;
        this.userInfo = data.email;
      } else {
        this.isLoggedIn = false;
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
