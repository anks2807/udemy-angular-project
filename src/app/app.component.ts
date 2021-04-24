import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  constructor(private sessionService: SessionService) {}

  ngOnInit() {
    this.subscription = this.sessionService.getLoginInfo().subscribe(data => {
      this.isLoggedIn = true;
      this.userInfo = data.email;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
