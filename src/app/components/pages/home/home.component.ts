import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../shared/models/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public posts: Post[];

  constructor(private _postService: PostService) { }

  ngOnInit() {
    this._postService.getAllPosts().subscribe(
      res => {
        this.posts = res;
      }
    );
  }

}
