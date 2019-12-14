import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../../shared/models/post';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  public postForm: FormGroup;
  private image: any;

  constructor(private _postService: PostService) {
    this.postForm = new FormGroup({
      titlePost: new FormControl('', Validators.required),
      contentPost: new FormControl('', Validators.required),
      tagsPost: new FormControl('', Validators.required),
      imagePost: new FormControl('', Validators.required),
    });
  }


  ngOnInit() {
  }

  addNewPost(data: Post) {
    this._postService.preSavePost(data, this.image);
  }

  handleImage(event): void {
    this.image = event.target.files[0];    
    console.log(this.image);
    
  }
}
