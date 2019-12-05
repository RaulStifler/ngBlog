import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

const myModule = [
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatProgressSpinnerModule,
  MatDividerModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
]

@NgModule({
  imports: [
    CommonModule,
    myModule,
  ],
  exports: [myModule]
})
export class MaterialModule { }
