import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsPostComponent } from './components/posts/details-post/details-post.component';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';

const routes: Routes = [
  {
    path: '', component: ContainerAppComponent,
    children: [
      {
        path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) }, { path: 'posts', loadChildren: () => import('./components/posts/list-posts/list-posts.module').then(m => m.ListPostsModule)
      },
      {
        path: 'post/:id', component: DetailsPostComponent
      },
      { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },
      { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      }
    ]
  },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
