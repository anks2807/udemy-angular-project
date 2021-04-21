import { Subject } from 'rxjs';
import { Recipe } from '../model/recipe.model';

export class RecipeService {
    constructor() {}

    addUpdateSuccess: Subject<boolean> = new Subject();

    private recipes: Recipe[] = [];


    public setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.addUpdateSuccess.next(true);
    }

    public getRecipes() {
        return this.recipes.slice();
    }

    public getRecipeById(id: number) {
        return this.recipes.find(r => r.id === id);
    }

    public addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.addUpdateSuccess.next(true);
    }

    public updateRecipe(recipe: Recipe) {
        this.recipes.splice(this.recipes.findIndex(r => r.id === recipe.id), 1, recipe);
        this.addUpdateSuccess.next(true);
    }

    public deleteRecipe(id: number) {
        this.recipes.splice(this.recipes.findIndex(r => r.id === id), 1);
        this.addUpdateSuccess.next(true);
    }
}
