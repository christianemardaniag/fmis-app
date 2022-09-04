import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FacultyComponent } from './faculty/faculty.component';
import { FacultyProfileComponent } from './faculty/faculty-profile/faculty-profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationFormsComponent } from './registration/registration-forms/registration-forms.component';
import { FormPersonalDataComponent } from './registration/registration-forms/form-personal-data/form-personal-data.component';
import { FormEducationalBackgroundComponent } from './registration/registration-forms/form-educational-background/form-educational-background.component';
import { FormCivilServiceComponent } from './registration/registration-forms/form-civil-service/form-civil-service.component';
import { FormWorkExperienceComponent } from './registration/registration-forms/form-work-experience/form-work-experience.component';
import { FormSeminarsComponent } from './registration/registration-forms/form-seminars/form-seminars.component';
import { LoginComponent } from './login/login.component';
import { EducationalVocationalComponent } from './registration/registration-forms/form-educational-background/educational-vocational/educational-vocational.component';
import { EducationalCollegeComponent } from './registration/registration-forms/form-educational-background/educational-college/educational-college.component';
import { EducationalGraduateStudiesComponent } from './registration/registration-forms/form-educational-background/educational-graduate-studies/educational-graduate-studies.component';
import { FacultyDashboardComponent } from './faculty/faculty-dashboard/faculty-dashboard.component';
import { AgePipe } from './faculty/faculty-dashboard/age.pipe';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { ProfileEditComponent } from './faculty/faculty-profile/profile-edit/profile-edit.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminFacultyComponent } from './admin/admin-faculty/admin-faculty.component';
import { AdminApplicationComponent } from './admin/admin-application/admin-application.component';
import { SearchQueryPipe } from './model/search-query.pipe';
import { AdminReportComponent } from './admin/admin-report/admin-report.component';
import { SearchSpecificPipe } from './model/search-specific.pipe';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    FacultyComponent,
    FacultyProfileComponent,
    RegistrationComponent,
    RegistrationFormsComponent,
    FormPersonalDataComponent,
    FormEducationalBackgroundComponent,
    FormCivilServiceComponent,
    FormWorkExperienceComponent,
    FormSeminarsComponent,
    LoginComponent,
    EducationalVocationalComponent,
    EducationalCollegeComponent,
    EducationalGraduateStudiesComponent,
    FacultyDashboardComponent,
    AgePipe,
    AdminComponent,
    AdminDashboardComponent,
    ProfileEditComponent,
    AdminLoginComponent,
    AdminFacultyComponent,
    AdminApplicationComponent,
    SearchQueryPipe,
    AdminReportComponent,
    SearchSpecificPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
