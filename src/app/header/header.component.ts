import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/services/authentication.service';
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
    private authService: AuthService,
    private router: Router) { }

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

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
