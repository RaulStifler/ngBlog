import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../../material.module';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [AdminComponent],
  imports: [
  CommonModule,
    AdminRoutingModule,
    MaterialModule,
  ]
})
export class AdminModule { }
