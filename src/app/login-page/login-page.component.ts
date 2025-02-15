import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone:true,
  imports:[FormsModule,RouterLink],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}
 
  onLogin() {
    if (this.username && this.password) {
      // Navigate to the dashboard after login
      this.router.navigate(['/dashboard']);
    } else {
      alert('Please enter valid credentials.');
    }
  }
}
