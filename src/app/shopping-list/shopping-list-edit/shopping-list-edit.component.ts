import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../model/ingredient.model';
import { ShoppingService } from '../service/shopping.service';
import * as ShoppingListActions from '../store/shoppingList.action';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild(NgForm) shoppingForm: NgForm;
  editMode: boolean = false;
  @Output() addSuccess: EventEmitter<any> = new EventEmitter();
  ingrdientSubscription: Subscription;
  editIngredeintIndex: number;
  constructor(private shoppingService: ShoppingService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit() {
    this.ingrdientSubscription = this.shoppingService.ingredientSelected.subscribe((index: number) => {
      this.editIngredeintIndex = index;
      const ingredient: Ingredient = this.shoppingService.getIngredient(index);
      this.shoppingForm.form.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      });
      this.editMode = true;
    });
  }

  ngOnDestroy() {
    this.ingrdientSubscription.unsubscribe();
  }
  onsubmit() {
    const ingredient: Ingredient = {
      name: this.shoppingForm.value.name,
      amount: this.shoppingForm.value.amount
    };
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editIngredeintIndex, ingredient);
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredientAction(ingredient));
    }
    this.editMode = false;
    this.addSuccess.emit();
    this.shoppingForm.reset();
  }

  deleteItem() {
    this.shoppingService.deleteIngrdient(this.editIngredeintIndex);
    this.addSuccess.emit();
    this.shoppingForm.reset();
  }

}
