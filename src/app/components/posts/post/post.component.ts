import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../shared/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _postService: PostService) { }
  public post: Post;

  ngOnInit() {
    this._postService.getOnePost(this.route.snapshot.params.id).subscribe(res => this.post = res);
  }

}
