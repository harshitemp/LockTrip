import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import detectEthereumProvider from '@metamask/detect-provider';

interface NonceResponse {
  nonce: string;
}
interface VerifyResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule, RouterLink,HttpClientModule],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  fullname: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  // Handle signup logic
  onSignup() {
    console.log('User Details:', this.fullname, this.email, this.phone, this.password);
    this.router.navigate(['/dashboard']);
  }

  // MetaMask login handler
  loginWithMetaMask() {
    let ethereum: any;

    from(detectEthereumProvider())
      .pipe(
        switchMap(async (provider) => {
          if (!provider) {
            throw new Error('Please install MetaMask');
          }
          ethereum = provider;
          return await ethereum.request({ method: 'eth_requestAccounts' });
        }),
        switchMap(() =>
          this.http.post<NonceResponse>('http://localhost:5000/api/auth/getNonceToSign', {
            address: ethereum.selectedAddress,
          })
        ),
        switchMap(
          async (response) =>
            await ethereum.request({
              method: 'personal_sign',
              params: [response.nonce, ethereum.selectedAddress],
            })
        ),
        switchMap((signature) =>
          this.http.post<VerifyResponse>('http://localhost:5000/api/auth/verifySignedMessage', {
            address: ethereum.selectedAddress,
            signature: signature,
          })
        )
      )
      .subscribe(
        (response) => {
          if (response.success) {
            console.log('MetaMask login successful');
            this.router.navigate(['/dashboard']);
          } else {
            console.error('MetaMask login failed: ', response.message);
          }
        },
        (err) => {
          console.error('Error during MetaMask login', err);
        }
      );
  }
}
