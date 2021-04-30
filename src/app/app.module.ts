import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingService } from './shopping-list/service/shopping.service';
import { RecipeService } from './recipes/service/recipes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionService } from './shared/session.service';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { RecipeModule } from './recipes/recipes.module';
import { AuthModule } from './authentication/auth.module';
import { ShopppingModule } from './shopping-list/shopping.module';
import { SharedModule } from './shared/shared.module';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RecipeModule,
    SharedModule,
    AuthModule,
    ShopppingModule,
    AppRoutingModule,
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
