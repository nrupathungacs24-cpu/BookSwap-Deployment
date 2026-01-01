import { NgModule } from '@angular/core';
import { AuthGuard } from './core/guards/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { BookStoreComponent } from './features/books/pages/book-store/book-store.component';
import { ListBookComponent } from './features/books/pages/list-book/list-book.component';
import { UserProfileComponent } from './features/profile/pages/user-profile/user-profile.component';
import { TestConnectionComponent } from './components/test-connection/test-connection.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'bookStore',
    component: BookStoreComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'listBook',
    component: ListBookComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:uid',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'test-connection',
    component: TestConnectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
