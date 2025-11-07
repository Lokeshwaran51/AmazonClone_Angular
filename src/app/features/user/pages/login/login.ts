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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.submitting.set(true);
      const email = this.form.value.email ?? '';
      localStorage.setItem("Email", email);
      console.log(email);
    // simulate async login
    setTimeout(() => {
      console.log('Form submitted:', this.form.value);
      this.router.navigate(['/home']);
      this.submitting.set(false);
    }, 1500);
  }
} 
