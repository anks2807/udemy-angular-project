import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/authentication.service';
import { SessionService, SESSION_KEYS } from '../shared/session.service';
import { Ingredient } from './model/ingredient.model';
import { AppState } from './store/shoppingList.reducer';
import * as ShoppingListActions from './store/shoppingList.action';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[]}>;
  constructor(private authService: AuthService, private sessionService: SessionService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.authService.triggerLogin({
      email: this.sessionService.get(SESSION_KEYS.USER_INFO),
      accessToken: this.sessionService.get(SESSION_KEYS.ACCESS_TOKEN)
    });
    this.ingredients = this.store.select('shoppingList');
  }

  selectIngredient(index: number) {
    const payload = {
      editIndex: index
    }
    this.store.dispatch(new ShoppingListActions.StartEdit(payload));
  }

}
