import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { Book } from '../../../../shared/models/book.model';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css'],
})
export class ListBookComponent implements OnDestroy {
  bookForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    author: ['', [Validators.required]],
    description: [''],
    condition: ['', [Validators.required]],
    isbn: ['', [Validators.required, Validators.pattern(/^\d{10,13}$/)]],
  });

  private authSubscription: Subscription | undefined;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  addBook() {
    if (this.bookForm.invalid) {
      this.toastr.error(
        'Please fill out all required fields and correct any errors.',
        'Error'
      );
      return;
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    this.authSubscription = this.authService.user$.subscribe((user) => {
      if (user) {
        const bookData: Book = {
          ...this.bookForm.value,
          userUID: user.uid,
          status: 'available'
        };

        this.bookService.addBook(bookData).subscribe({
          next: () => {
            console.log('Data Added Successfully');
            this.toastr.success('Book added successfully', 'Success');
            this.bookForm.reset();
          },
          error: (err) => {
            console.log(err.message);
            this.toastr.error('An error occurred while adding the book', 'Error');
          }
        });
      } else {
        this.toastr.error('You must be logged in to add a book', 'Error');
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

