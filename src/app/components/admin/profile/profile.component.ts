import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/models/user';
import { File } from '../../../shared/models/file';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public image: File;
  public currentImage: string = 'https://picsum.photos/150/150';

  constructor(private _authService: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({value: '', disabled: true}, Validators.required),
    photoURL: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this._authService.userData.subscribe(user => {
      this.initValuesForm(user);
    })
  }

  private initValuesForm(user: User): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
    })
  }

  guardarUsuario(user: User):void {
    this._authService.preSaveUserProfile(user, this.image);
  }

  handleImage(image: File):void {
    this.image = image;
  }

}
