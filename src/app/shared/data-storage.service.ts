import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { RecipeService } from './../recipes/service/recipes.service';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/model/recipe.model';
@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    fetchData() {
        const url = 'https://ng-udemy-recipe-book-c7084-default-rtdb.firebaseio.com/recipes.json';
        return this.http.get<Recipe[]>(url);
    }


    saveData(): Observable<any> {
        const url = 'https://ng-udemy-recipe-book-c7084-default-rtdb.firebaseio.com/recipes.json';
        const recipes = this.recipeService.getRecipes();
        return this.http.put(url, recipes);
    }
}