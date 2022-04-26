import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './admin/admin-routing.module';
import { AdminComponent } from './admin/layout/admin/admin.component';
import { AuthGuard } from './api/guard/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { ResidentComponent } from './residents/layout/resident/resident.component';


export const AppRoutes: Routes = [

  {
    path: '',
    canActivate: [AuthGuard],
    component: ResidentComponent,
    loadChildren: () => import('./residents/resident.module').then(m => m.ResidentModule)

     
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)

     
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: 'full'
  },

  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "verify-email",
    component: VerifyEmailComponent,
  },
  {
    path: "loggedout",
    component: SignoutComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  
];

