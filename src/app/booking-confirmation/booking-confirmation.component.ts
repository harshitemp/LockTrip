import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-confirmation',
  imports: [],
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.css'
})
export class BookingConfirmationComponent {

  constructor(private router: Router) {}

  // Redirects to another page when "Done" is clicked
  goToAnotherPage() {
    this.router.navigate(['/rewards']); // Change '/another-page' to the desired route
  }
}