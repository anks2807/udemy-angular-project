import { NgModule } from '@angular/core';
import { AlertComponent } from '../shared/alert/alert.component';
import { DynamicComp } from '../shared/dynamic-comp.directive';
import { DropdownItemDirective } from '../shared/dropdown-item.directive';
import { LoadingComponent } from '../shared/loading/loading.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [
        DropdownItemDirective,
        PageNotFoundComponent,
        LoadingComponent,
        AlertComponent,
        DynamicComp
    ],
    imports: [CommonModule],
    exports: [
        DropdownItemDirective,
        PageNotFoundComponent,
        LoadingComponent,
        AlertComponent,
        DynamicComp
    ]
})
export class SharedModule {}