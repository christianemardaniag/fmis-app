import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardActivitiesComponent } from './dashboard/dashboard-activities/dashboard-activities.component';
import { DashboardApplicationComponent } from './dashboard/dashboard-application/dashboard-application.component';
import { FacultyComponent } from './faculty/faculty.component';
import { FacultyProfileComponent } from './faculty/faculty-profiles/faculty-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    DashboardActivitiesComponent,
    DashboardApplicationComponent,
    FacultyComponent,
    FacultyProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
