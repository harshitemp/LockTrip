import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RewardsComponent } from './rewards/rewards.component';
import { BookHotelComponent } from './book-hotel/book-hotel.component';
import { BookHotelFormComponent } from './book-hotel-form/book-hotel-form.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';

export const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent }, // Dashboard
    { path: 'rewards', component: RewardsComponent }, // Rewards Page
    { path: 'book-hotel', component: BookHotelComponent },
    {path:'signup-page',component:SignupPageComponent},
    { path: 'book-hotel-form/:hotelId', component: BookHotelFormComponent }, // Hotel details route
    {path:'login-page',component:LoginComponent},
    { path: 'booking-confirmation', component: BookingConfirmationComponent },
  { path: '', component: HomepageComponent }, // Default route
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route for 404
];
