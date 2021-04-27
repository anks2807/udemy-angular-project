import { Directive, ViewContainerRef } from '@angular/core';


@Directive({selector: '[dynamicComp]'})
export class DynamicComp {
    constructor(public viewContainerRef: ViewContainerRef) {}
}