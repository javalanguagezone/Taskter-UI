import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[tskRole]'
})



export class RoleDirective {

  constructor() { }

  @Input()
  role: string;

}
