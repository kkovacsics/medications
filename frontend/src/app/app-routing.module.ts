import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './common/forbidden/forbidden.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { LoginComponent } from './page/login/login.component';
import { MedicationComponent } from './page/medication/medication.component';
import { MedicineComponent } from './page/medicine/medicine.component';
import { ResidentComponent } from './page/resident/resident.component';
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
    path: 'resident',
    component: ResidentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'medicine',
    component: MedicineComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'medication',
    component: MedicationComponent,
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
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
