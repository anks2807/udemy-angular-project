import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipes/service/recipes.service';
import { DataStorageService } from './../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  ngOnInit() {
  }


  saveData() {
    this.dataStorageService.saveData().subscribe(response => {
      alert('Data Saved Successfully');
    });
  }

  fetchData() {
    this.dataStorageService.fetchData().subscribe(response => {
      this.recipeService.setRecipes(response);
    });
  }

}
