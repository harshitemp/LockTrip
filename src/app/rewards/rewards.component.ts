import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Import HttpClient
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rewards',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent {
  userPoints: number = 450;  // Example user points
  userRating: number = 5;  // Default rating (5 stars)
  userComment: string = '';  // Default comment
  message: string = '';  // For rewards claiming
  reviewMessage: string = '';  // For review submission message
  rewards: any[] = [];  // To store rewards from the backend
  reviews: any[] = [];  // To store reviews from the backend

  private apiUrl = 'http://localhost:5000/api/rewards';  // Backend URL

  constructor(private http: HttpClient) {}

  // Function to claim a reward
  claimReward(pointsRequired: number) {
    this.http.post(`${this.apiUrl}/claim`, { pointsRequired, userPoints: this.userPoints }).subscribe(
      (response: any) => {
        this.message = response.message;
        this.userPoints -= pointsRequired;  // Update user points after claiming the reward
      },
      (error) => {
        this.message = error.error.message;
      }
    );
  }

  // Function to submit a review
  submitReview() {
    this.http.post(`${this.apiUrl}/submit-review`, { rating: this.userRating, comment: this.userComment }).subscribe(
      (response: any) => {
        this.reviewMessage = response.message;
        this.userRating = 5;  // Reset the rating to 5 after submission
        this.userComment = '';  // Clear the comment field
      },
      (error) => {
        this.reviewMessage = error.error.message;
      }
    );
  }

  // Fetch rewards data from the backend
  fetchRewards() {
    this.http.get(`${this.apiUrl}/rewards`).subscribe(
      (data: any) => {
        this.rewards = data;
      },
      (error) => {
        console.error('Error fetching rewards:', error);
      }
    );
  }

  // Fetch reviews data from the backend
  fetchReviews() {
    this.http.get(`${this.apiUrl}/reviews`).subscribe(
      (data: any) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }

  // Component lifecycle hook to fetch data on initialization
  ngOnInit() {
    this.fetchRewards();
    this.fetchReviews();
  }
}
