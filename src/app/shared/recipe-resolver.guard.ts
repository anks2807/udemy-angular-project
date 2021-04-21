import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { tap } from 'rxjs/operators'
import { Recipe } from './../recipes/model/recipe.model';
import { RecipeService } from '../recipes/service/recipes.service';


@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private dataService: DataStorageService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        return this.dataService.fetchData().pipe(tap(response => this.recipeService.setRecipes(response)));
    }

}