import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
<<<<<<< HEAD
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
=======
import {MatCardModule} from '@angular/material/card';

>>>>>>> 9bf83909dbdd7fde9d8f8aa4009f39577431306f
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
<<<<<<< HEAD
    MatListModule,
    MatExpansionModule
=======
    MatCardModule
    
>>>>>>> 9bf83909dbdd7fde9d8f8aa4009f39577431306f
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
<<<<<<< HEAD
    MatListModule,
    MatExpansionModule
=======
    MatCardModule
>>>>>>> 9bf83909dbdd7fde9d8f8aa4009f39577431306f
  ]
})
export class MaterialDesignModule { }
