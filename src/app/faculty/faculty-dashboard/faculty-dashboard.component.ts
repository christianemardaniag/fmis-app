import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Faculty } from '../../model/faculty.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-faculty-dashboard',
  templateUrl: './faculty-dashboard.component.html',
  styleUrls: ['./faculty-dashboard.component.css']
})
export class FacultyDashboardComponent implements OnInit {
  private baseUrl = "https://fmis-app-240e4-default-rtdb.firebaseio.com/";
  faculty: Faculty = new Faculty;
  id: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id')!;
        console.log(this.id);
       
      });
    this.http.get<any>(this.baseUrl + 'faculty.json').subscribe(data => {
      console.log("FETCHING EMPLOYEE NUMBER: [" + this.id + "]");
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key];
          if (this.id == element.employeeNo) {
            this.faculty = element;
            console.log("FACULTY:");
            console.log(this.faculty);
            break;
          }
        }
      }

    });
  }

}
