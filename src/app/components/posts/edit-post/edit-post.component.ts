import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../../shared/models/post';
import { PostService } from '../../../services/post.service';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  private image: any;
  private imageOriginal: any;
  
  @Input() post: Post;

  constructor(private _postService: PostService) {}

  public editPostForm = new FormGroup({
    idPost: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.initValuesForm();
  }

  editPost(post: Post){
    if (this.image === this.imageOriginal) {
      post.imagePost = this.imageOriginal;
      this._postService.updatePostById(post);
    } else {
      this._postService.updatePostById(post, this.image);
    }
  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

  private initValuesForm():void {
    this.editPostForm.patchValue({
      idPost: this.post.idPost,
      titlePost: this.post.titlePost,
      contentPost: this.post.contentPost,
      tagsPost: this.post.tagsPost,
    });
  }
}
