import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-admin-application',
  templateUrl: './admin-application.component.html',
  styleUrls: ['./admin-application.component.css']
})
export class AdminApplicationComponent implements OnInit {
  faculty: Faculty[] = [];
  isFetching = false;
  searchTerm = '';
  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.isFetching = true;
    this.facultyService.getAllApplication().subscribe(data => {
      this.faculty = data;
      this.isFetching = false;
    })
  }

  onActivate(componentReference:any) {
    componentReference.refreshParent.subscribe(() => {
      this.fetchData();
   })
  }

}
