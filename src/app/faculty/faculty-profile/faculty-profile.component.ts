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
  isFetching = false;
  pos = localStorage.getItem('position')!;
  constructor(private route: ActivatedRoute,
    private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id')!;
      });
    this.fetchData();
  }

  fetchData() {
    this.isFetching = true;
    this.facultyService.getFacultyById(this.id).subscribe(data => {
      this.faculty = data;
      this.isFetching = false;
      console.log(data);
    })
  }

  changeStatus(id: string, status: string) {
    this.facultyService.updateInfo(id, {status: status}).subscribe(()=>{
      this.fetchData();
    })
  }

  a(a: any) {
    console.log(a.checked);
  }

}
