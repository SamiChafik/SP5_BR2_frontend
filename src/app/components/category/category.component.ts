import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';

interface Category {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  categoryForm: FormGroup;
  categories: Category[] = [];
  isEditing = false;
  currentCategoryId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(
      (data) => this.categories = data,
      (error) => console.error('Error loading categories', error)
    );
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) return;

    const categoryData = this.categoryForm.value;

    if (this.isEditing && this.currentCategoryId) {
      this.categoriesService.updateCategory(this.currentCategoryId, categoryData).subscribe(
        () => {
          this.loadCategories();
          this.resetForm();
        }
      );
    } else {
      this.categoriesService.createCategory(categoryData).subscribe(
        () => {
          this.loadCategories();
          this.resetForm();
        }
      );
    }
  }

  onEdit(category: Category): void {
    this.isEditing = true;
    this.currentCategoryId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoriesService.deleteCategory(id).subscribe(
        () => this.loadCategories()
      );
    }
  }

  resetForm(): void {
    this.categoryForm.reset();
    this.isEditing = false;
    this.currentCategoryId = null;
  }

}
