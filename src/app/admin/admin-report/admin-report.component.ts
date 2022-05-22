import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent implements OnInit {

  faculties: Faculty[] = [];
  filter: any = {};

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.facultyService.getAllActiveFaculty().subscribe(data => {
      this.faculties = data;
    });
  }

  search(searchForm: NgForm) {
    this.filter = searchForm.form.value;
  }

}
