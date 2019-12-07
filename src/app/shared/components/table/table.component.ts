import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../../../services/post.service';
import { Post } from '../../models/post';
import { element } from 'protractor';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  public posts: Post[];
  displayedColumns: string[] = ['titlePost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _postService: PostService) { }
  
  ngOnInit() {
    this._postService.getAllPosts().subscribe(
      res => {
        this.dataSource.data = res;
      }
    );
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editarPost(element){
    console.log('editare ', element);
  }

  eliminarPost(element) {
    console.log('eliminare ', element);
    
  }

  nuevoPost() {
    console.log('Creare nuevo post');
    
  }

}
