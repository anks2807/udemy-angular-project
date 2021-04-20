import { Ingredient } from 'src/app/shopping-list/model/ingredient.model';

export interface Recipe {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    ingredients: Ingredient[];
}
