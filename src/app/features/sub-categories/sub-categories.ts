import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/services/category';
import { SubCategories as SubCategoryService } from '../../core/services/sub-categories-Service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sub-categories.html',
  styleUrls: ['./sub-categories.scss']
})
export class SubCategories implements OnInit {

  categories: any[] = [];
  subcategories: any[] = [];
  selectedCategoryId!: number;
  selectedCategoryName: string = '';

  constructor(
    private categoryService: Category,
    private subCategoryService: SubCategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: any) => {
        this.categories = Array.isArray(categories) ? categories : categories.result || [];

        if (this.categories.length > 0) {
          this.selectedCategoryId = this.categories[0].categoryId;
          this.selectedCategoryName = this.categories[0].name;
          this.loadSubCategories(this.selectedCategoryId);
        }
      },
      error: (err: any) => console.error('Error fetching categories:', err)
    });
  }

  loadSubCategories(categoryId: number): void {
    this.subCategoryService.getSubCategories(categoryId).subscribe({
      next: (subCategories: any) => {
        this.subcategories = Array.isArray(subCategories) ? subCategories : subCategories?.result || [];
      },
      error: (err: any) => console.error('Error fetching subcategories:', err)
    });
  }

  onCategoryChange(categoryId: number): void {
    this.selectedCategoryId = +categoryId;
    const selected = this.categories.find(c => c.categoryId === this.selectedCategoryId);
    this.selectedCategoryName = selected?.name || '';
    this.loadSubCategories(this.selectedCategoryId);
  }

  getSubcategoryImageUrl(subCategoryName: string): string {
    const imageMap: { [key: string]: string } = {
      Mobiles: "https://m.media-amazon.com/images/I/31ppZt0uIML._SR480,440_.jpg",
      Laptops: "https://m.media-amazon.com/images/G/31/IMG24/Smart_Watches/ELP_revamp/laptop._SS400_QL85_.jpg",
      Televisions: "https://m.media-amazon.com/images/I/41-ALR1y5lL._SR480,440_.jpg",
      Cameras: "https://m.media-amazon.com/images/I/914hFeTU2-L._AC_UL320_.jpg",
      Headphones: "https://m.media-amazon.com/images/I/318RvHnDwHL._AC._SR240,240.jpg",
      Speakers: "https://m.media-amazon.com/images/I/31P5MqaytiL._AC._SR240,240.jpg",
      Drones: "https://m.media-amazon.com/images/I/61gdM4h2G5L._AC_UL320_.jpg",
      "Wearable Technology": "https://m.media-amazon.com/images/I/41wiAeSSN0L.AC_SX250.jpg",
      "Smart Home Devices": "https://m.media-amazon.com/images/G/31/img18/PC/SmartHome/Revamp/PC/smart_home_devices._CB499295206_.jpg",
      "Gaming Consoles": "https://m.media-amazon.com/images/I/51tlsAFgZAL._AC_SR180,120_CB1169409_QL70_.jpg"
    };
    return imageMap[subCategoryName] || '/assets/images/subcategories/default.jpg';
  }

}

