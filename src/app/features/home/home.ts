import { ChangeDetectorRef, Component } from '@angular/core';
import { LoginComponent } from '../user/pages/login/login';
import { RegisterComponent } from '../user/pages/register/register';
import { RouterModule } from '@angular/router';
import { Category } from '../../core/services/category';
import { CommonModule, NgForOf, NgIf, } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  categories: any[] = [];
constructor(private categoryService: Category, private cd: ChangeDetectorRef) {}
ngOnInit(): void {
  this.loadCategories();
}

loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.categories = data;
        } else if (data && Array.isArray(data.result)) {
          this.categories = data.result;
        } else {
          console.error('Invalid category data:', data);
        }
        console.log("Categories:", this.categories);
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }
}
