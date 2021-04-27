import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { DropdownItemDirective } from './shared/dropdown-item.directive';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingService } from './shopping-list/service/shopping.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReceipesComponent } from './recipes/receipes.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeService } from './recipes/service/recipes.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { SessionService } from './shared/session.service';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { DynamicComp } from './shared/dynamic-comp.directive';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReceipesComponent,
    RecipeItemComponent,
    RecipeListComponent,
    ShoppingListComponent,
    RecipeDetailComponent,
    DropdownItemDirective,
    ShoppingListEditComponent,
    PageNotFoundComponent,
    RecipeEditComponent,
    AuthenticationComponent,
    LoadingComponent,
    AlertComponent,
    DynamicComp
  ],
  imports: [
    BrowserModule,
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
