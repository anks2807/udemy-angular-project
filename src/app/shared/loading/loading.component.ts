import { Component } from '@angular/core';

@Component(
    {
        selector: 'app-loading',
        styleUrls: ['./loading.component.css'],
        template: '<div class="lds-ring"><div></div><div></div><div></div><div></div></div>'
    }
)
export class LoadingComponent {

}