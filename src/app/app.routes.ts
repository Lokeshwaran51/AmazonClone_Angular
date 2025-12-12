import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'user/login', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./features/home/home').then(m => m.Home) },
  { path: 'user/login', loadComponent: () => import('./features/user/pages/login/login').then(m => m.LoginComponent) },
  { path: 'user/register', loadComponent: () => import('./features/user/pages/register/register').then(m => m.RegisterComponent) },
  { path: 'getSubCategories/:categoryId', loadComponent: () => import('./features/sub-categories/sub-categories').then(m => m.SubCategories) },
  { path: '**', redirectTo: '' },
];
