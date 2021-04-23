import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {  ReceipesComponent } from './recipes/receipes.component';
import {  RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeResolverService } from './shared/recipe-resolver.guard';
import { AuthenticationComponent } from './authentication/authentication.component';

const routes: Routes = [
  {path: 'recipes', component: ReceipesComponent, children: [
    {path: 'detail/:id', component: RecipeDetailComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: 'edit/:id', component: RecipeEditComponent}
  ], resolve: [RecipeResolverService]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AuthenticationComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
