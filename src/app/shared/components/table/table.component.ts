import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PostService } from '../../../services/post.service';
import { Post } from '../../models/post';
import { element } from 'protractor';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

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

  constructor(private _postService: PostService, public dialog: MatDialog) { }
  
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

  eliminarPost(post: Post) {
    Swal.fire({
      title: '¿Seguro de eliminar?',
      text: '¡Esta accion no podra deshacerse!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then(
      res => {
        if (res.value) {
          this._postService.deletePostById(post)
          .then(() => {
            Swal.fire('Eliminado','Tus post ha sido eliminado','success');
          })
          .catch(error => {
            Swal.fire('No se pudo eliminar', error, 'error');
          });
        } else {
          console.log('No elimino nada, tu tranqui :D');
        }
      }
    );
  }

  nuevoPost() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
    });
  }

}
