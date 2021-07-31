import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { SideNavigationComponent } from './common/side-navigation/side-navigation.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ResidentsComponent } from './page/residents/residents.component';
import { MedicinesComponent } from './page/medicines/medicines.component';
import { MedicationsComponent } from './page/medications/medications.component';
import { UsersComponent } from './page/users/users.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { LoginComponent } from './page/login/login.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { ForbiddenComponent } from './common/forbidden/forbidden.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { DataEditComponent } from './common/data-edit/data-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SideNavigationComponent,
    DashboardComponent,
    ResidentsComponent,
    MedicinesComponent,
    MedicationsComponent,
    UsersComponent,
    DataTableComponent,
    LoginComponent,
    ForbiddenComponent,
    UserEditComponent,
    DataEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
