import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MedicationComponent } from './page/medication/medication.component';
import { MedicineComponent } from './page/medicine/medicine.component';
import { ResidentComponent } from './page/resident/resident.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'resident',
    component: ResidentComponent
  },
  {
    path: 'medicine',
    component: MedicineComponent
  },
  {
    path: 'medication',
    component: MedicationComponent
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
