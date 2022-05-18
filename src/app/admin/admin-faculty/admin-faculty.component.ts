import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-admin-faculty',
  templateUrl: './admin-faculty.component.html',
  styleUrls: ['./admin-faculty.component.css']
})
export class AdminFacultyComponent implements OnInit {
  faculty: Faculty[] = [];
  isFetching = false;
  searchTerm = '';

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.facultyService.getAllActiveFaculty().subscribe(data => {
      this.faculty = data;
      this.isFetching = false;
    })
  }

}
