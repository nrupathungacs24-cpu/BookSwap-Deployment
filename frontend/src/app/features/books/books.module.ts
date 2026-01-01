import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BookStoreComponent } from './pages/book-store/book-store.component';
import { ListBookComponent } from './pages/list-book/list-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

@NgModule({
    declarations: [
        BookStoreComponent,
        ListBookComponent,
        BookDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ],
    exports: [
        BookStoreComponent,
        ListBookComponent,
        BookDetailComponent
    ]
})
export class BooksModule { }
