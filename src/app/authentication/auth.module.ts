import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationComponent } from '../authentication/authentication.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/authentication.service';

@NgModule({
    declarations: [
        AuthenticationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            {path: '', component: AuthenticationComponent}
        ])
    ],
    exports: [RouterModule],
    providers: [
        AuthService
    ]
})
export class AuthModule {}