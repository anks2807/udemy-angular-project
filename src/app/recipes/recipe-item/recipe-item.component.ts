import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() selectedRecipe: EventEmitter<boolean> = new EventEmitter();
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  selectRecipe(event) {
    this.router.navigate([`detail/${this.recipe.id}`], {relativeTo: this.route});
    this.selectedRecipe.emit(true);
  }

}
