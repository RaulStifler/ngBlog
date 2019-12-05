import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../shared/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private afs: AngularFirestore) {}

  getAllPosts():Observable<Post[]> {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(
        actions => actions.map(a=>{
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data }
        })
      )
    );
  }

  getOnePost(id: Post): Observable<Post>{
    return this.afs.doc<Post>(`posts/${id}`).valueChanges();
  }
}
