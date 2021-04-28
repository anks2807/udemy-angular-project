import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { CanActivateGuard } from '../shared/can-activate.guard'; 

const routes: Routes = [
    {path: 'shopping-list', component: ShoppingListComponent, canActivate: [CanActivateGuard]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [ RouterModule ] 
})
export class ShoppingRouteModule {

}