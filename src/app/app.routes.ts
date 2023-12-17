import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', loadComponent: () => import('./components/main-page/main-page.component').then(m => m.MainPageComponent) },
    { path: 'compiler', loadComponent: () => import('./components/compiler/compiler.component').then(m => m.CompilerComponent) }
];
