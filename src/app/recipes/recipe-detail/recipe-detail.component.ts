import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingService } from 'src/app/shopping-list/service/shopping.service';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  @Output() addIngredientSuccess: EventEmitter<any> = new EventEmitter();
  constructor(private shoppingService: ShoppingService,
              private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getRecipe();
  }

  getIngredients() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
    this.addIngredientSuccess.emit();
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
