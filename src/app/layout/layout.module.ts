import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MaterialDesignModule } from '../shared/material-design/material-design.module';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialDesignModule
  ],
  exports: [
    HeaderComponent,
    NavigationMenuComponent
  ]
})
export class LayoutModule { }
