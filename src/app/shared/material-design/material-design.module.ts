import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';


import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MatSelectModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class MaterialDesignModule { }
