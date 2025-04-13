import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(m => m.LoginComponent)
      },
      {
        canActivate: [AuthGuard],
        path: 'task',
        loadComponent: () =>
          import('./components/task/task.component').then(m => m.TaskComponent)
      },
      {
        path: '**',
        redirectTo: 'login'
      }
];
