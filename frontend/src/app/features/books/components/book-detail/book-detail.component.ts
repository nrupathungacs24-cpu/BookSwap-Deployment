import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ProfileService } from '../../../profile/services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  @Input() isbn!: string;
  @Input() ownerUid!: string;
  @Output() closeModalEvent = new EventEmitter<void>();
  bookDetails: any;
  isModalOpen: boolean = true;
  ownerAvatarUrl: string = '';
  ownerUsername: string = '';

  constructor(
    private bookService: BookService,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Fetch book details based on ISBN when the modal is opened
    if (this.isbn) {
      this.bookService.getBookDetailsByISBN(this.isbn).subscribe((data) => {
        if (data.items && data.items.length > 0) {
          this.bookDetails = data.items[0];
        }
      });
    }

    if (this.ownerUid) {
      this.fetchOwnerData();
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  viewUser() {
    this.router.navigate(['/profile', this.ownerUid]);
  }

  fetchOwnerData() {
    this.profileService.getUserProfile(this.ownerUid).subscribe({
      next: (userData) => {
        if (userData) {
          this.ownerAvatarUrl = userData['avatarUrl'];
          this.ownerUsername = userData['username'];
        } else {
          console.log('Owner user not found');
        }
      },
      error: (err) => console.error('Error fetching owner data:', err)
    });
  }
}

