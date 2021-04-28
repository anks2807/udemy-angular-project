import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../shared/can-activate.guard';
import { RecipeResolverService } from '../shared/recipe-resolver.guard';
import {  ReceipesComponent } from './receipes.component';
import {  RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
    {path: 'recipes', component: ReceipesComponent, children: [
        {path: 'detail/:id', component: RecipeDetailComponent},
        {path: 'new', component: RecipeEditComponent},
        {path: 'edit/:id', component: RecipeEditComponent}
      ], resolve: [RecipeResolverService], canActivate: [CanActivateGuard]}
]
@NgModule(
    {
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    }
)
export class RecipeRouteModule {
}