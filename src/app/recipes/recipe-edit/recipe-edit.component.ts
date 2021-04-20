import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shopping-list/model/ingredient.model';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode: boolean = false;
  recipeFormGroup: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      if (param.id) {
        this.editMode = true;
        this.recipe = this.recipeService.getRecipeById(+param.id);
      } else {
        this.editMode = false;
      }
      this.initForm();
    });
  }

  initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    const ingredientArray = new FormArray([]);

    if (this.editMode) {
      recipeName = this.recipe.name;
      imagePath = this.recipe.imagePath;
      description = this.recipe.description;
      this.recipe.ingredients.forEach(ingredient => {
        ingredientArray.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
      });
    }

    this.recipeFormGroup = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath),
      description: new FormControl(description, Validators.required),
      ingredients: ingredientArray
    });
  }

  addIngredient() {
    (this.recipeFormGroup.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onSubmit() {
    const recipe: Recipe = {
      id: this.editMode ? this.recipe.id : this.recipeService.getRecipes().length + 1,
      name: this.recipeFormGroup.value.name,
      imagePath: this.recipeFormGroup.value.imagePath,
      description: this.recipeFormGroup.value.description,
      ingredients: []
    };

    const ingredients: Ingredient[] = [];
    this.recipeFormGroup.value.ingredients.forEach(el => {
      const ingredient: Ingredient = {
        name: el.name,
        amount: el.amount
      };
      ingredients.push(ingredient);
    });

    recipe.ingredients = ingredients;
    if (this.editMode) {
      this.recipeService.updateRecipe(recipe);
      this.router.navigate(['detail', this.route.snapshot.params.id], {relativeTo: this.route.parent});
    } else {
      this.recipeService.addRecipe(recipe);
      this.router.navigate(['recipes']);
    }
    this.recipeFormGroup.reset();
  }

  removeIngredient(index) {
    (this.recipeFormGroup.get('ingredients') as FormArray).controls.splice(index, 1);
    this.recipeFormGroup.value.ingredients.splice(index, 1);
  }

  onCancel() {
    this.router.navigate(['recipes']);
  }

}
