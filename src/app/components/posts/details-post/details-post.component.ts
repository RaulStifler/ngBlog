import { Component, OnInit } from '@angular/core';
import { Post } from '../../../shared/models/post';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.scss']
})
export class DetailsPostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _postService: PostService) { }
  public post: Post;

  ngOnInit() {
    this._postService.getOnePost(this.route.snapshot.params.id).subscribe(res => this.post = res);
  }

}
