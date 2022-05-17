import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminApplicationComponent } from './admin/admin-application/admin-application.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminFacultyComponent } from './admin/admin-faculty/admin-faculty.component';
import { AdminComponent } from './admin/admin.component';
import { FacultyProfileComponent } from './faculty/faculty-profile/faculty-profile.component';
import { ProfileEditComponent } from './faculty/faculty-profile/profile-edit/profile-edit.component';
import { FacultyComponent } from './faculty/faculty.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'fmis', component: AdminLoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: AdminComponent, children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      {
        path: 'faculty', component: AdminFacultyComponent, children: [
          { path: ':id', component: FacultyProfileComponent }
        ]
      },
      {
        path: 'application', component: AdminApplicationComponent, children: [
          { path: ':id', component: FacultyProfileComponent }
        ]
      }
    ]
  },
  {
    path: 'faculty', component: FacultyComponent, children: [
      { path: ':id', component: FacultyProfileComponent },
      { path: 'edit/:id', component: ProfileEditComponent }

    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
