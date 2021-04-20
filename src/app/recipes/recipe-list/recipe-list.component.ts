import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipes.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;
  @Output() recipeClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    this.subscription = this.recipeService.addUpdateSuccess.subscribe(val => {
      if (val) {
        this.recipes = this.recipeService.getRecipes();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectedRecipe(event) {
    this.recipeClicked.emit(event);
  }

}
