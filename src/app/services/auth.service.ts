import { Injectable } from '@angular/core';
import { User } from '../shared/models/user';
import { File } from '../shared/models/file';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: Observable<firebase.User>;
  private filePath: string;
  

  constructor(private afAuth: AngularFireAuth, private storage: AngularFireStorage) {
    this.userData = afAuth.authState;
  }

  loginByEmail(user: User){
    const { email, password } = user;
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logOut(){
    this.afAuth.auth.signOut();
  }

  preSaveUserProfile(user: User, image?: File): void {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }
  }

  uploadImage(user: User, image: File){
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe( urlImage => {
            user.photoURL = urlImage;
            this.saveUserProfile(user);
          });
        })
      ).subscribe();
  }

  private saveUserProfile(user: User) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL,
    })
    .then( () => console.log('User updated!'))
    .catch(error => console.log(error))
  }
}
