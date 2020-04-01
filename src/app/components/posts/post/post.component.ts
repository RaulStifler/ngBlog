import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../shared/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;

  constructor(private _postService: PostService) { }

  ngOnInit() {}

}
