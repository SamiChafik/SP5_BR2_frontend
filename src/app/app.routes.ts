import { Routes } from '@angular/router';
import { TransactionComponent } from './components/transaction/transaction.component';
import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

export const routes: Routes = [
    { path: '', component: TransactionComponent},
    { path: 'form', component: TransactionComponent},
    { path: 'transactionList', component: TransactionListComponent},
    { path: '**', redirectTo: '' }
];
