import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { NewPostModule } from './components/posts/new-post/new-post.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';

import { environment } from '../environments/environment';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { EditPostComponent } from './components/posts/edit-post/edit-post.component';
import { DetailsPostComponent } from './components/posts/details-post/details-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    ToolbarComponent,
    ContainerAppComponent,
    ModalComponent,
    EditPostComponent,
    DetailsPostComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NewPostModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [ModalComponent],
  providers: [
    { provide: StorageBucket, useValue: 'gs://stiflerblog-dfcfe.appspot.com' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
