import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../services/transaction.service';
import { CategoriesService } from '../../services/categories.service';

interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  category: string;
}

interface Category {
  id: number;
  name: string;
}
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {
  transactionForm: FormGroup;
  transactions: Transaction[] = [];
  categories: Category[] = [];
  isEditing = false;
  currentTransactionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private categoriesService: CategoriesService
  ) {
    this.transactionForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      date: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
    this.loadCategories();
  }

  loadTransactions(): void {
    this.transactionService.getTransactions().subscribe(
      (data) => this.transactions = data,
      (error) => console.error('Error loading transactions', error)
    );
  }

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe(
      (data) => this.categories = data,
      (error) => console.error('Error loading categories', error)
    );
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) return;

    const transactionData = this.transactionForm.value;

    if (this.isEditing && this.currentTransactionId) {
      this.transactionService.updateTransaction(this.currentTransactionId, transactionData).subscribe(
        () => {
          this.loadTransactions();
          this.resetForm();
        }
      );
    } else {
      console.log(transactionData);
      this.transactionService.createTransaction(transactionData).subscribe(
        () => {
          this.loadTransactions();
          this.resetForm();
        }
      );
    }
  }

  onEdit(transaction: Transaction): void {
    this.isEditing = true;
    this.currentTransactionId = transaction.id;
    this.transactionForm.patchValue({
      amount: transaction.amount,
      date: transaction.date,
      description: transaction.description,
      categoryId: transaction.category
    });
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      this.transactionService.deleteTransaction(id).subscribe(
        () => this.loadTransactions()
      );
    }
  }

  resetForm(): void {
    this.transactionForm.reset();
    this.isEditing = false;
    this.currentTransactionId = null;
  }
}