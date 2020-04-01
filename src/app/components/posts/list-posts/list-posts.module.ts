import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../material.module';
import { ListPostsRoutingModule } from './list-posts-routing.module';
import { ListPostsComponent } from './list-posts.component';
import { TableComponent } from 'src/app/shared/components/table/table.component';

@NgModule({
  declarations: [ListPostsComponent, TableComponent],
  imports: [
CommonModule,
    ListPostsRoutingModule,
    MaterialModule,
  ]
})
export class ListPostsModule { }
