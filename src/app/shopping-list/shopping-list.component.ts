import { Component, OnInit } from '@angular/core';
import { Ingredient } from './model/ingredient.model';
import { ShoppingService } from './service/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppoingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppoingService.getShoppingList();
  }

  addSuccess(event) {
    this.ingredients = this.shoppoingService.getShoppingList();
  }

  selectIngredient(index: number) {
    this.shoppoingService.selectIngredient(index);
  }

}
