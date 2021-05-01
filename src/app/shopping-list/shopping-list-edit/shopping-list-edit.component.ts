import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { timestamp } from 'rxjs/operators';
import { Ingredient } from '../model/ingredient.model';
import * as ShoppingListActions from '../store/shoppingList.action';
import { AppState } from '../store/shoppingList.reducer';

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
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.ingrdientSubscription = this.store.select('shoppingList').subscribe(data => {
      if (data.editIndex > -1) {
        this.editIngredeintIndex = data.editIndex;
        this.shoppingForm.form.setValue({
          name: data.editIngredient.name,
          amount: data.editIngredient.amount
        });
        this.editMode = true;
      } else {
        this.editMode = false;
        if (this.shoppingForm) {
          this.shoppingForm.reset();
        }
      }
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
      this.store.dispatch(new ShoppingListActions.UpdateIngredientAction({index: this.editIngredeintIndex, ingredient: ingredient}))
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredientAction(ingredient));
    }
    this.editMode = false;
    this.shoppingForm.reset();
  }

  deleteItem() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredientAction({index: this.editIngredeintIndex}));
    this.shoppingForm.reset();
  }

  stopEdit() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
