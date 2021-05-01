import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shopping-list/store/shoppingList.reducer';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipes.service';
import * as ShoppingListActions from '../../shopping-list/store/shoppingList.action'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.getRecipe();
  }

  getIngredients() {
    this.store.dispatch(new ShoppingListActions.AddIngredientsAction(this.recipe.ingredients));
  }

  getRecipe() {
    this.route.params.subscribe((param: Params) => {
      this.recipe = this.recipeService.getRecipeById(+param.id);
    });
  }

  editClick() {
    this.router.navigate([`edit/${this.recipe.id}`], {relativeTo: this.route.parent });
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['recipes']);
  }

}
