import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { SideNavigationComponent } from './common/side-navigation/side-navigation.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ResidentComponent } from './page/resident/resident.component';
import { MedicineComponent } from './page/medicine/medicine.component';
import { MedicationComponent } from './page/medication/medication.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SideNavigationComponent,
    DashboardComponent,
    ResidentComponent,
    MedicineComponent,
    MedicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
