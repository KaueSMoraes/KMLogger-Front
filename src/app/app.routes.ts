import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BeginLayoutComponent } from './layouts/begin-layout/begin-layout.component';


export const routes: Routes = [
  {
    path: 'login',
    component: BeginLayoutComponent,
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];