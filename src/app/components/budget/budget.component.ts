import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';

interface Budget {
  id: number;
  category: string;
  limitAmount: number;
  spentAmount: number;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.scss'
})
export class BudgetComponent implements OnInit {
  budgetForm: FormGroup;
  budgets: Budget[] = [];
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private categoriesService: CategoriesService
  
  ) {
    this.budgetForm = this.fb.group({
      category: ['', Validators.required],
      limitAmount: ['', [Validators.required]],
      spentAmount: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadBudgets();
    this.loadCategories();
  }

  loadBudgets(): void {
    this.budgetService.getBudgets().subscribe(
      (data) => this.budgets = data,
      (error) => console.error('Error loading budgets', error)
    );
    console.log(this.budgets);
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(
      (data) => this.categories = data,
      (error) => console.error('Error loading categories', error)
    );
  }

  onDelete(id: number){
    if (confirm('Are you sure you want to delete this category?')) {
      this.budgetService.deleteBudget(id).subscribe(
        () => this.loadBudgets()
      );
    }
  }

  onSubmit(): void {
    if (this.budgetForm.invalid) return;

    const budgetData = this.budgetForm.value;
    console.log(budgetData);
    this.budgetService.createBudget(budgetData).subscribe(
      () => {
        this.loadBudgets();
        this.budgetForm.reset();
      }
    );
  }
}
