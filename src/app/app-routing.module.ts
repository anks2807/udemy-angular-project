import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {  ReceipesComponent } from './recipes/receipes.component';
import {  RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  {path: 'recipes', component: ReceipesComponent, children: [
    {path: 'detail/:id', component: RecipeDetailComponent},
    {path: 'new', component: RecipeEditComponent},
    {path: 'edit/:id', component: RecipeEditComponent}
  ]},
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
