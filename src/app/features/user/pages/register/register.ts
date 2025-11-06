import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardModule } from "@angular/material/card";

@Component({
  selector: 'app-register',
  standalone: true,
   imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule 
],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  submitting = false;
  form;

  constructor(private fb: FormBuilder, private user: UserService, private router: Router) {
    this.form = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
    });
  }

  /* submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    this.user.register(this.form.value as any).subscribe({
      next: () => this.router.navigateByUrl('/user/login'),
      error: () => (this.submitting = false),
    });
  } */
submit() {
    if (this.form.invalid) {
      alert('Please fill all fields correctly.');
      return;
    }

  this.submitting = true;

  console.log('Form submitted:', this.form.value);
  setTimeout(() => {
    const success = true; 

    if (success) {
      console.log('Registration successful');
      this.router.navigateByUrl('/user/login');
    } else {
      console.error('Registration failed');
      alert('Registration failed. Please try again.');
    }

    this.submitting = false;
  }, 1500);
}
}