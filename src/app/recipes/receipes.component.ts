import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from './model/recipe.model';
import { RecipeService } from './service/recipes.service';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css']
})
export class ReceipesComponent implements OnInit {
  selectedRecipe: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  recipeClicked(event) {
    this.selectedRecipe = event;
  }

}
