import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { UserMenuComponent } from './user-menu/user-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  exports: [
    HeaderComponent,
    UserMenuComponent
  ]
})
export class LayoutModule { }
