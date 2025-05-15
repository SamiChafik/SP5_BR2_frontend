import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit {
  transactionForm: FormGroup;
  categories = ['Revenus', 'Alimentation', 'Transport', 'Logement', 'Loisirs', 'Santé', 'Éducation', 'Autre'];
  isEditMode = false;
  currentTransactionId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      amount: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.currentTransactionId = id;
          return this.transactionService.getTransaction(id);
        }
        return [null];
      })
    ).subscribe({
      next: (transaction) => {
        if (transaction) {
          this.populateForm(transaction);
        }
      },
      error: (err) => {
        console.error('Error loading transaction:', err);
      }
    });
  }

  populateForm(transaction: any): void {
    this.transactionForm.patchValue({
      amount: transaction.amount,
      date: transaction.date,
      description: transaction.description,
      category: transaction.category || ''
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transactionData = {
        amount: this.transactionForm.value.amount,
        date: this.transactionForm.value.date,
        description: this.transactionForm.value.description,
        category: this.transactionForm.value.category
      };

      const saveOperation = this.isEditMode && this.currentTransactionId
        ? this.transactionService.updateTransaction(this.currentTransactionId, transactionData)
        : this.transactionService.saveTransaction(transactionData);

      saveOperation.subscribe({
        next: () => {
          alert(`Transaction ${this.isEditMode ? 'modifiée' : 'enregistrée'} avec succès!`);
          console.log(transactionData);
          this.router.navigate(['/transactionList']);
        },
        error: (err) => alert('Erreur: ' + err.message)
      });
    }

    // console.log(this.transactionForm.value);
  }
}