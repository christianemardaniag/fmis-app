import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacultyComponent } from './faculty/faculty.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'faculty', component: FacultyComponent},
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
