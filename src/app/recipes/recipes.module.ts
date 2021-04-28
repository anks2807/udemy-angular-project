import { NgModule } from '@angular/core';
import { ReceipesComponent } from './receipes.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { CommonModule } from '@angular/common';
import { RecipeRouteModule } from './recipe-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
        declarations: [
            ReceipesComponent,
            RecipeItemComponent,
            RecipeListComponent,
            RecipeEditComponent,
            RecipeDetailComponent,
        ],
        imports: [
            CommonModule,
            RecipeRouteModule,
            ReactiveFormsModule,
            FormsModule
        ]
    }
)
export class RecipeModule {
}