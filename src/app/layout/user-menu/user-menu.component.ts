import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/user.service';

@Component({
  selector: 'tsk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @Input() currentUser: User = null; 
  @Input() userMenu: any = null;
  constructor() { }

  ngOnInit() {
  }
  
  toggleMenu() {
    this.userMenu.toggle();
  }
}
