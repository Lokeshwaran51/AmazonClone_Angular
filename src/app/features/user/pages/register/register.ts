import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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

  submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    this.user.register(this.form.value as any).subscribe({
      next: () => this.router.navigateByUrl('/user/login'),
      error: () => (this.submitting = false),
    });
  }
}