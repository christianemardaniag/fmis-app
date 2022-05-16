import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-faculty-profile',
  templateUrl: './faculty-profile.component.html',
  styleUrls: ['./faculty-profile.component.css']
})
export class FacultyProfileComponent implements OnInit {
  faculty: Faculty = new Faculty;
  id: string = '';
  constructor(private route: ActivatedRoute,
    private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id')!;
      });
      this.facultyService.getFacultyById(this.id).subscribe(data => {
        this.faculty = data;
        console.log(data);
      })
  }

  a(a:any) {
    console.log(a.checked);
  }

}
