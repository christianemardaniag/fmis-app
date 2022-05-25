import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';
import { environment } from 'src/environments/environment';


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
  workCtr = 0;
  seminarCtr = 0;
  vocationalEntry = [1];
  collegeEntry = [1];
  graduateEntry = [1];
  civilServiceEntry = [1];
  workEntry = [1];
  seminarEntry = [1];
  civilServiceType = ["Career Service", "RA 1080 (board/bar) Under Special Laws", "CES", "CSEE Barangay Eligibility", "Driver's License"]
  appointmentStatus = ["Permanent", "Temporary", "Casual", "Contractual"];
  coverage = ['International', 'National', 'Regional', 'Local'];
  ldType = ['Managerial', 'Supervisory', 'Technical'];

  firebaseApp = initializeApp(environment.firebase);
  metadata = { contentType: 'image/jpeg' };
  storage = getStorage();
  certificates: string[] = [];

  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.facultyService.getAllActiveFaculty().subscribe(async data => {
      this.faculties = data;
      for (const f of this.faculties) {
        this.certificates = [];
        if(f.certificates) {
          for (let c of f.certificates) {
            this.certificates.push(await getDownloadURL(ref(this.storage, 'certificates/' + c)));
          }
          f.certificates = this.certificates;
        }
      }      
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

  addWorkEntry() {
    this.workEntry.push(1);
    this.workCtr++;
  }

  addSeminarEntry() {
    this.seminarEntry.push(1);
    this.seminarCtr++;
  }

}
