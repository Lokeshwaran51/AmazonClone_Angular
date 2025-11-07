import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../../core/services/category';
import { SubCategories as SubCategoryService } from '../../core/services/sub-categories-Service';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';

@Component({
  selector: 'app-sub-categories',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './sub-categories.html',
  styleUrls: ['./sub-categories.scss']
})
export class SubCategories implements OnInit {
  categoryId!: number;
  categories: any[] = [];
  subcategories: any[] = [];
  selectedCategoryName: string = '';

  constructor(
    private categoryService: Category,
    private subCategoryService: SubCategoryService,
    private cd:ChangeDetectorRef,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      const id = params.get('categoryId');
      if (id) {
        this.categoryId = +id; 
        this.loadSubCategories(this.categoryId);
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: any[]) => {
        this.categories = Array.isArray(categories) ? categories : [];
        if (this.categories.length > 0) {
          this.selectedCategoryName = this.categories[0].categoryName;
          this.loadSubCategories(this.categories[0].categoryId);
        }
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

 loadSubCategories(categoryId: number): void {
  this.subCategoryService.getSubCategories(categoryId).subscribe({
    next: (response: any) => {
      // Assign array directly to trigger Angular change detection
      //this.subcategories = Array.isArray(response) ? [...response] : [...(response?.result || [])];
       this.subcategories = [...response];
        console.log("subcategories:", this.subcategories); 
        this.cd.detectChanges();
    },
    error: (err: any) => {
      console.error('Error fetching subcategories:', err);
      this.subcategories = [];
      this.cd.detectChanges();
    }
  });
}
}
