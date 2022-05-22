import { Component, OnInit } from '@angular/core';
import { Faculty } from '../model/faculty.model';
import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  faculty: Faculty[] = [];
  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.facultyService.getAllApplication().subscribe((data) => {
      this.faculty = data;
    })
  }

  onActivate(componentReference: any) {
    componentReference.refreshParent.subscribe(() => {
      this.fetchData();
    })
  }
}
