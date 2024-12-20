import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-hotel-form',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './book-hotel-form.component.html',
  styleUrl: './book-hotel-form.component.css'
})
export class BookHotelFormComponent {
  name: string = '';
  aadhaarCard: string = '';
  PhoneNumber:Number | undefined;
  paymentMethod: string = '';
  Points:Number | undefined;
  constructor(private router: Router) {}

  // This method is triggered when the form is submitted
  onSubmit() {
    // You can add validation here for the form fields before navigating
    if (this.name && this.aadhaarCard && this.PhoneNumber  && this.paymentMethod && this.Points ) {
      this.router.navigate(['/booking-confirmation']); // Redirect to confirmation page
    } else {
      alert('Please fill in all the fields.');
    }
  }
}