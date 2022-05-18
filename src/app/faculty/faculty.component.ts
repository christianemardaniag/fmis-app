import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Faculty } from '../model/faculty.model';
import { FacultyService } from '../services/faculty.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  id = localStorage.getItem('loggedID');
  faculty: Faculty = new Faculty;
  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  printWindow() {
    window.print();
  }

  fetchData() {
    this.facultyService.getFacultyById(this.id!).subscribe(data => {
      this.faculty = data;
      console.log(data);
      
    })
  }

}
