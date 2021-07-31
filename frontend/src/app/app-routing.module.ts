import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './common/forbidden/forbidden.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { LoginComponent } from './page/login/login.component';
import { MedicationsComponent } from './page/medications/medications.component';
import { MedicinesComponent } from './page/medicines/medicines.component';
import { ResidentsComponent } from './page/residents/residents.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { UsersComponent } from './page/users/users.component';
import { AuthGuardService } from './service/auth-guard.service';
import { RoleGuardService } from './service/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: 'residents',
    component: ResidentsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'medicines',
    component: MedicinesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'medications',
    component: MedicationsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2,
    }
  },
  {
    path: 'user/:id',
    component: UserEditComponent,
    canActivate: [AuthGuardService, RoleGuardService],
    data: {
      expectedRole: 2,
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
