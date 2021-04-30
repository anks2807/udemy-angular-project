import { Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../authentication/services/authentication.service';
import { RecipeService } from '../recipes/service/recipes.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { DynamicComp } from '../shared/dynamic-comp.directive';
import { SessionService } from '../shared/session.service';
import { DataStorageService } from './../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() userInfo: string;
  @ViewChild(DynamicComp) dynamicComp: DynamicComp;
  alertSubscription: Subscription;
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private authService: AuthService,
    private router: Router,
    private cfr: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }


  saveData() {
    this.dataStorageService.saveData().subscribe(response => {
      const message: string[] = ['Data Saved Successfully'];
      this.handleAlerts(message);
    });
  }

  handleAlerts(message: string[]) {
    const alertComponentFactory = this.cfr.resolveComponentFactory(AlertComponent);
    this.dynamicComp.viewContainerRef.clear();
    const alertComponent = this.dynamicComp.viewContainerRef.createComponent(alertComponentFactory);
    alertComponent.instance.messages = message;
    alertComponent.instance.close.subscribe(() => {
      this.dynamicComp.viewContainerRef.clear();
      this.alertSubscription.unsubscribe();
    })
  }

  fetchData() {
    this.dataStorageService.fetchData().subscribe(response => {
      this.recipeService.setRecipes(response);
    });
  }

  logout() {
    if (this.authService.getAutoLogoutTimer()) {
      clearTimeout(this.authService.getAutoLogoutTimer());
    }
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
