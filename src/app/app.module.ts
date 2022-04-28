import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardActivitiesComponent } from './dashboard/dashboard-activities/dashboard-activities.component';
import { DashboardApplicationComponent } from './dashboard/dashboard-application/dashboard-application.component';
import { FacultyComponent } from './faculty/faculty.component';
import { FacultyProfileComponent } from './faculty/faculty-profiles/faculty-profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationFormsComponent } from './registration/registration-forms/registration-forms.component';
import { FormPersonalDataComponent } from './registration/registration-forms/form-personal-data/form-personal-data.component';
import { FormEducationalBackgroundComponent } from './registration/registration-forms/form-educational-background/form-educational-background.component';
import { FormCivilServiceComponent } from './registration/registration-forms/form-civil-service/form-civil-service.component';
import { FormWorkExperienceComponent } from './registration/registration-forms/form-work-experience/form-work-experience.component';
import { FormSeminarsComponent } from './registration/registration-forms/form-seminars/form-seminars.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    DashboardActivitiesComponent,
    DashboardApplicationComponent,
    FacultyComponent,
    FacultyProfileComponent,
    RegistrationComponent,
    RegistrationFormsComponent,
    FormPersonalDataComponent,
    FormEducationalBackgroundComponent,
    FormCivilServiceComponent,
    FormWorkExperienceComponent,
    FormSeminarsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
