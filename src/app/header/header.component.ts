import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RecipeService } from '../recipes/service/recipes.service';
import { SessionService } from '../shared/session.service';
import { DataStorageService } from './../shared/data-storage.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() userInfo: string;
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private sessionService: SessionService) { }

  ngOnInit() {
      window.console.log(this.userInfo);
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
