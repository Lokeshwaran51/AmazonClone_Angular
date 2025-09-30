import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  submitting = false;
  form;

  constructor(private fb: FormBuilder, private user: UserService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.invalid) return;
  
    this.submitting = true;
  
    // Ensure loginData matches LoginPayload type (no null/undefined)
    const { email, password } = this.form.value;
    const loginData = { email: email ?? '', password: password ?? '' };

    this.user.login(loginData).subscribe({
      next: (response: { Token: string }) => {
        // Store JWT in localStorage
        localStorage.setItem('token', response.Token);
        // Navigate to home/dashboard
        this.router.navigateByUrl('/home');
  
        this.submitting = false;
      },
      error: (err) => {
        console.error('Login failed', err);
        this.submitting = false;
  
        // Optional: show error message in template
        alert('Login failed. Please check your credentials.');
      },
    });
  }
}