import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownItemDirective } from './shared/dropdown-item.directive';
import { ShoppingService } from './shopping-list/service/shopping.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipes/service/recipes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { SessionService } from './shared/session.service';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { DynamicComp } from './shared/dynamic-comp.directive';
import { RecipeModule } from './recipes/recipes.module'; 
import { ShopppingModule } from './shopping-list/shopping.module';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownItemDirective,
    PageNotFoundComponent,
    AuthenticationComponent,
    LoadingComponent,
    AlertComponent,
    DynamicComp
  ],
  imports: [
    BrowserModule,
    RecipeModule,
    ShopppingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ShoppingService,
    RecipeService,
    SessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
