import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyDashboardComponent } from './faculty/faculty-dashboard/faculty-dashboard.component';
import { FacultyProfileComponent } from './faculty/faculty-profile/faculty-profile.component';
import { ProfileEditComponent } from './faculty/faculty-profile/profile-edit/profile-edit.component';
import { FacultyComponent } from './faculty/faculty.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: 'fmis', component: RegistrationComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: HeaderComponent, children: [
      { path: 'dashboard', component: HeaderComponent },
      { path: 'faculty', component: FacultyComponent }
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
