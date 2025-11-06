import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Category } from '../../core/services/category';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatBadgeModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  categories: any[] = [];
constructor(private categoryService: Category, private cd: ChangeDetectorRef) {}
ngOnInit(): void {
  this.loadCategories();
}

sliderImages = [
    'https://m.media-amazon.com/images/I/71cp9PVuTfL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/61GnAucagBL._SX3000_.png',
    'https://m.media-amazon.com/images/I/71qlKqpJnlL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/71cQMXCLSvL._SX3000_.jpg'
  ];

  productCards = [
    {
      title: 'Up to 60% off | Styles for Men',
      items: [
        { img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-1-186-116._SY116_CB636110853_.jpg', name: 'Clothing' },
        { img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-3-186-116._SY116_CB636110853_.jpg', name: 'Footwear' },
        { img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/BAU/Oct/186X116_3._SY116_CB606110532_.jpg', name: 'Watches' },
        { img: 'https://images-eu.ssl-images-amazon.com/images/G/31/img22/Fashion/Gateway/BAU/BTF-Refresh/May/PF_MF/MF-4-186-116._SY116_CB636110853_.jpg', name: 'Bags & Luggage' }
      ]
    },
    // add more cards as needed
  ];

  todayDeals = [
    { img: 'https://m.media-amazon.com/images/I/51eV91P63QL._AC_SY200_.jpg', discount: 'Up to 52% off', type: 'Deal of the day', name: 'Messi Jersey' },
    { img: 'https://m.media-amazon.com/images/I/51T5YQij9sL._AC_SY200_.jpg', discount: 'Up to 52% off', type: 'Deal of the day', name: 'Retro gaming console' },
    { img: 'https://m.media-amazon.com/images/I/61LWG8Kj-WL._AC_SY200_.jpg', discount: 'Up to 52% off', type: 'Deal of the day', name: 'Ronaldo Jerseys' },
    { img: 'https://m.media-amazon.com/images/I/41bKejqo86L._AC_SY200_.jpg', discount: 'Up to 52% off', type: 'Deal of the day', name: 'Half Sleeves T-Shirt' },
    { img: 'https://m.media-amazon.com/images/I/411mbYGYIdL._AC_SY200_.jpg', discount: 'Up to 52% off', type: 'Deal of the day', name: 'Campus Footwear' }
  ];

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
