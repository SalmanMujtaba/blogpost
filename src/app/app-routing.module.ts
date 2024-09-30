import { RouterModule, Routes } from '@angular/router';

import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'blogs', component: BlogListComponent },
  { path: 'create-blog', component: BlogFormComponent },
  { path: 'edit-blog/:id', component: BlogFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }