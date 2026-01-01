import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/auth/auth.service';
import { ProfileService } from '../../services/profile.service';
import { BookService } from '../../../books/services/book.service';
import { LocationSuggestionsService } from '../../services/location-suggestions.service';
import { SwapService } from '../../../swap/services/swap.service';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore'; // Keeping update logic here or move to service? Ideally move to service.

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: any;
  showUpdateModal: boolean = false;
  showDeleteModal = false;
  currentUserUID: string | undefined;
  locationSuggestions: any[] = [];
  isContactModalOpen = false;
  selectedBookForExchange: any;
  receiverEmail: string = '';
  bookToDelete: any;
  proposedBook: any = {
    title: '',
    author: '',
  };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private bookService: BookService,
    private swapService: SwapService,
    private route: ActivatedRoute,
    private locationSuggestionsService: LocationSuggestionsService,
    private toastr: ToastrService,
    private firestore: Firestore // Only used for updateDoc currently
  ) {
    this.retrieveUserData();
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.currentUserUID = user.uid;
      }
    });
  }

  onLocationInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    if (query) {
      this.locationSuggestionsService.getLocationSuggestions(query).subscribe(
        (data: any) => {
          this.locationSuggestions = data;
        },
        (error) => {
          console.error('Error fetching location suggestions:', error);
        }
      );
    } else {
      this.locationSuggestions = [];
    }
  }

  selectLocation(suggestion: any) {
    this.user.location = suggestion.display_name;
    this.locationSuggestions = [];
  }

  private retrieveUserData() {
    this.route.paramMap.subscribe((params) => {
      const userUID = params.get('uid');
      if (userUID) {
        this.profileService.getUserProfile(userUID).subscribe({
          next: (userData) => {
            if (userData) {
              this.user = userData;
              // Fetch books
              this.bookService.getBooksByUser(userUID).subscribe(books => {
                this.user.listedBooks = books;
                // Fetch covers
                this.user.listedBooks.forEach((book: any) => {
                  if (book.isbn) {
                    this.bookService.getBookDetailsByISBN(book.isbn).subscribe(data => {
                      if (data.items && data.items.length > 0) {
                        book.coverImage = data.items[0].volumeInfo.imageLinks?.thumbnail;
                      }
                    });
                  }
                });
              });
            } else {
              this.toastr.warning('There is no such user in the database!', 'Warning');
            }
          },
          error: (err) => {
            this.toastr.error('An error occurred while fetching user data', 'Error');
          }
        });
      }
    });
  }

  toggleUpdateModal() {
    this.showUpdateModal = !this.showUpdateModal;
  }

  isCurrentUserProfile(): boolean {
    return this.currentUserUID === this.user.userUID;
  }

  showDeleteConfirmationModal(book: any) {
    this.bookToDelete = book;
    this.showDeleteModal = true;
  }

  hideDeleteModal() {
    this.bookToDelete = null;
    this.showDeleteModal = false;
  }

  proposeBookTrade(book: any) {
    if (!this.currentUserUID) {
      this.toastr.error('You must be logged in to swap', 'Error');
      return;
    }
    // Need current user details to send email
    this.profileService.getUserProfile(this.currentUserUID).subscribe(currentUser => {
      if (currentUser) {
        this.swapService.initiateSwapRequest(
          this.user.userEmail,
          book.title,
          book.author,
          currentUser,
          this.user
        );
      }
    });
  }

  updateDetails(updateForm: NgForm) {
    const newUserData = {
      firstName: updateForm.value.firstName,
      lastName: updateForm.value.lastName,
      gender: updateForm.value.gender,
      location: updateForm.value.location,
      birthday: updateForm.value.birthday,
      summary: updateForm.value.summary,
      instaId: updateForm.value.instaId,
      twitterId: updateForm.value.twitterId,
    };

    if (this.user && this.user.id) {
      const userDocRef = doc(this.firestore, 'users', this.user.id);
      updateDoc(userDocRef, newUserData)
        .then(() => {
          this.toastr.success('User details updated successfully', 'Success');
          this.toggleUpdateModal();
          // Ideally refresh data or update local state
          Object.assign(this.user, newUserData);
        })
        .catch(error => {
          this.toastr.error('Error updating user details', 'Error');
          console.error(error);
        });
    } else {
      this.toastr.error('User not found for update', 'Error');
    }
  }

  deleteBook(book: any) {
    if (book.id) {
      this.bookService.deleteBook(book.id).subscribe({
        next: () => {
          this.user.listedBooks = this.user.listedBooks.filter((b: any) => b !== book);
          this.toastr.success('The book has been deleted successfully', 'Success');
          this.hideDeleteModal();
        },
        error: (err) => this.toastr.error('Error deleting book', 'Error')
      });
    }
  }

  confirmDelete() {
    if (this.bookToDelete) {
      this.deleteBook(this.bookToDelete);
    }
  }
}

