import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatCardModule
} from '@angular/material/card';
import {
  MatFormFieldModule
} from '@angular/material/form-field';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatIconModule
} from '@angular/material/icon';
import {
  MatDividerModule
} from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user';
declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
    CommonModule 
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  hidePassword = signal(true);
  submitting = signal(false);
  form;
  private router = inject(Router); 

  constructor(private fb: FormBuilder, private User:UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  /* ngOnInit(){
     setTimeout(() => {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '481253017265-q9e2kvm120rebnhml9hpr69sqrvnpu4t.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleResponse(response),
      });

      google.accounts.id.renderButton(
        document.getElementById('googleBtn'),
        { theme: 'outline', size: 'large' }
      );
    } else {
      console.error("Google script not loaded");
    }
  }, 500);
  } */

  ngOnInit() {
  this.loadGoogleScript().then(() => {
    console.log("Google script loaded");

    google.accounts.id.initialize({
      client_id: '481253017265-q9e2kvm120rebnhml9hpr69sqrvnpu4t.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleResponse(response),
    });

    google.accounts.id.renderButton(
      document.getElementById('googleBtn'),
      { theme: 'outline', size: 'large' }
    );
  });
}

loadGoogleScript(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof google !== "undefined") {
      resolve();
      return;
    }

    const interval = setInterval(() => {
      if (typeof google !== "undefined") {
        clearInterval(interval);
        resolve();
      }
    }, 200);
  });
}

  submit() {
    if (this.form.invalid) return;

    this.submitting.set(true);
    const payload={
       email : this.form.value.email ?? '',
       password : this.form.value.password ?? ''
      }
      
      localStorage.setItem("Email", payload.email);
      console.log(payload.email);

      this.User.login(payload).subscribe({
        next:(res)=>{
           //console.log('Login success:', res),
           localStorage.setItem('auth_token', res.token);
           this.router.navigate(['/home'])
        },
        error:(err)=>{
          console.log("Login Failed..",err);
          alert("Invalid Credentials.");
        },
        complete:()=>{
          this.submitting.set(false);
        }
      });
  }

  signInWithGoogle(){
  google.accounts.id.prompt();
  }

  private handleGoogleResponse(response: any) {
    const idToken = response.credential; // JWT token from Google
    const payload = JSON.parse(atob(idToken.split('.')[1])); // decode JWT payload

  const email = payload.email;
  console.log("Google Email:", email);

  localStorage.setItem("Email", email);
    console.log('Google ID Token:', idToken);

    this.User.googleLogin({ token: idToken }).subscribe({
      next: (res) => {
        localStorage.setItem('auth_token', res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Google login failed:', err);
        alert('Google login failed.');
      },
    });
  }
} 