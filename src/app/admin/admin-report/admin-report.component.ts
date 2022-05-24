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
  vocationalCtr = 0;
  collegeCtr = 0;
  graduateCtr = 0;
  civilServiceCtr = 0;
  vocationalEntry = [1];
  collegeEntry = [1];
  graduateEntry = [1];
  civilServiceEntry = [1];

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
    console.log(this.filter);
  }

  addVocationalEntry() {
    this.vocationalEntry.push(1);
    this.vocationalCtr++;
  }

  addCollegeEntry() {
    this.collegeEntry.push(1);
    this.collegeCtr++;
  }

  addGraduateEntry() {
    this.graduateEntry.push(1);
    this.graduateCtr++;
  }

  addCivilServiceEntry() {
    this.civilServiceEntry.push(1);
    this.civilServiceCtr++;
  }
}
