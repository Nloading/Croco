import { Routes } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { PostsComponent } from './pages/posts/posts.component';
import { TodosComponent } from './pages/todos/todos.component';
import { OffersComponent } from './pages/offers/offers.component';

export const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'todos/:id', component: TodosComponent },
  { path: 'posts/:userId', component: PostsComponent },
  { path: 'offers', component: OffersComponent },
  { path: '**', redirectTo: '/users' }
];
