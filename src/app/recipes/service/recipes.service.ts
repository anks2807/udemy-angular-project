import { Subject } from 'rxjs';
import { Recipe } from '../model/recipe.model';

export class RecipeService {
    constructor() {}

    addUpdateSuccess: Subject<boolean> = new Subject();

    recipes: Recipe[] = [
        {
            id: 1,
            name: 'Corn Curry',
            description: 'Description For Corp Curry',
            imagePath: '../../assets/img/recipe1.jpg',
            ingredients: [
                {
                    name: 'Corn',
                    amount: 20
                },
                {
                    name: 'Spices',
                    amount: 30
                }
            ]
        },
        {
            id: 2,
            name: 'Dal Fry',
            description: 'Description For Dal Fry',
            imagePath: '../../assets/img/recipe2.jpg',
            ingredients: [
                {
                    name: 'Pulse',
                    amount: 100
                },
                {
                    name: 'Spices',
                    amount: 30
                }
            ]
        },
        {
            id: 3,
            name: 'Italian Pizza',
            description: 'Description For Pizza',
            imagePath: '../../assets/img/recipe3.jpg',
            ingredients: [
                {
                    name: 'Pizza Base',
                    amount: 100
                },
                {
                    name: 'Mozerella Cheese',
                    amount: 10
                },
                {
                    name: 'Mashrooms',
                    amount: 10
                }
            ]
        }
    ];

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
