import { Routes } from '@angular/router';
import { TransactionComponent } from './components/transaction/transaction.component';
import { CategoryComponent } from './components/category/category.component';
import { BudgetComponent } from './components/budget/budget.component';
import { HomeComponent } from './components/home/home.component';
// import { TransactionListComponent } from './components/transaction-list/transaction-list.component';

export const routes: Routes = [
    { path: '', component: TransactionComponent},
    { path: 'home', component: HomeComponent},
    { path: 'transactions', component: TransactionComponent},
    // { path: 'transactionList', component: TransactionListComponent},
    { path: 'budget', component: BudgetComponent },
    { path: 'categories', component: CategoryComponent },
    { path: '**', redirectTo: '' }
];
