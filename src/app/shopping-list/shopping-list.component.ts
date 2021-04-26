import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/authentication.service';
import { SessionService, SESSION_KEYS } from '../shared/session.service';
import { Ingredient } from './model/ingredient.model';
import { ShoppingService } from './service/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private shoppoingService: ShoppingService,
    private authService: AuthService, private sessionService: SessionService) { }

  ngOnInit() {
    this.authService.triggerLogin({
      email: this.sessionService.get(SESSION_KEYS.USER_INFO),
      accessToken: this.sessionService.get(SESSION_KEYS.ACCESS_TOKEN)
    });
    this.ingredients = this.shoppoingService.getShoppingList();
  }

  addSuccess(event) {
    this.ingredients = this.shoppoingService.getShoppingList();
  }

  selectIngredient(index: number) {
    this.shoppoingService.selectIngredient(index);
  }

}
