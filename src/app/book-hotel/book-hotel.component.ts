import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router module

@Component({
  selector: 'app-book-hotel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-hotel.component.html',
  styleUrls: ['./book-hotel.component.css']
})
export class BookHotelComponent implements OnInit {
  hotels = [
    { name: 'Hotel Paradise', price: 150, location: 'New York', imageUrl: '/assests/bgdash.jpg', id: 1 },
    { name: 'The Grand Stay', price: 200, location: 'Los Angeles', imageUrl: '/assests/bg.png', id: 2 },
    { name: 'Ocean View Resort', price: 120, location: 'Miami', imageUrl: '/assests/3rd.jpeg', id: 3 },
    { name: 'Mountain Escape', price: 180, location: 'Denver', imageUrl: '/assests/4th.jpeg', id: 4 }
  ];

  filteredHotels = [...this.hotels];
  searchQuery = '';
  sortBy: 'name' | 'price' | 'location' = 'name'; // Restrict sortBy to valid keys

  constructor(private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.sortHotels(); // Sort by default on load
  }

  filterHotels() {
    this.filteredHotels = this.hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  sortHotels() {
    const key: 'name' | 'price' | 'location' = this.sortBy; // Restrict key to valid properties
    this.filteredHotels.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  }

  // Method to redirect to the hotel details page when the View button is clicked
  goToHotelDetails(hotelId: number) {
    this.router.navigate([`/book-hotel-form`, hotelId]); // Navigate to hotel details page with hotelId
  }
}
