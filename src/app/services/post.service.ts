import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Post } from '../shared/models/post';
import { File } from '../shared/models/file';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<Post>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
  ) {
    this.postsCollection = afs.collection<Post>('posts');
  }

  getAllPosts():Observable<Post[]> {
    return this.postsCollection.snapshotChanges().pipe(
      map(
        actions => actions.map(a=>{
          const data = a.payload.doc.data() as Post;
          const idPost = a.payload.doc.id;
          return { idPost, ...data }
        })
      )
    );
  }

  getOnePost(id: Post): Observable<Post>{
    return this.afs.doc<Post>(`posts/${id}`).valueChanges();
  }

  deletePostById(post: Post){
    return this.postsCollection.doc(post.idPost).delete();
  }

  updatePostById(post: Post) {
    return this.postsCollection.doc(post.idPost).update(post);
  }
  
  preSavePost(post: Post, image: File) {
    this.uploadImage(post, image);
  }

  private savePost(post) {
    const newPost: Post = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost,
    };
    this.postsCollection.add(newPost);
  }

  private uploadImage(post: Post, image: File){
    this.filePath = `images/${image.name}`;    
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.savePost(post);
          });
        })
      ).subscribe();
  }
}
