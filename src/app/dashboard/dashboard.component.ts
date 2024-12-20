import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userId: string = '123';  // Example user ID
  points: number = 0;
  upcomingBookings: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  // Fetch the dashboard data from backend
  fetchDashboardData(): void {
    this.http.get<any>(`http://localhost:3000/api/dashboard/${this.userId}`)
      .subscribe(
        (data) => {
          this.points = data.points;
          this.upcomingBookings = data.upcomingBookings;
        },
        (error) => {
          console.error('Error fetching dashboard data', error);
        }
      );
  }

  navigateTo(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}