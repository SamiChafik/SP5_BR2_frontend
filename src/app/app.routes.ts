import { Routes } from '@angular/router';
import { TransactionComponent } from './components/transaction/transaction.component';
import { CategoryComponent } from './components/category/category.component';
// import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

export const routes: Routes = [
    { path: '', component: TransactionComponent},
    { path: 'transactions', component: TransactionComponent},
    // { path: 'transactionList', component: TransactionListComponent},
    // { path: 'budget', component: BudgetComponent },
    { path: 'categories', component: CategoryComponent },
    { path: '**', redirectTo: '' }
];
