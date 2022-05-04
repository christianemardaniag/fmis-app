import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Faculty } from '../model/faculty.model';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-faculty-dashboard',
  templateUrl: './faculty-dashboard.component.html',
  styleUrls: ['./faculty-dashboard.component.css']
})
export class FacultyDashboardComponent implements OnInit {
  private baseUrl = "https://fmis-app-default-rtdb.firebaseio.com/";
  faculty: Faculty = new Faculty;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
    let id = this.route.snapshot.params['id'];
    this.http.get<any>(this.baseUrl + 'faculty.json').subscribe(data => {
      console.log("FETCHING EMPLOYEE NUMBER: ["+id+"]");
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (id == element.employeeNo) {
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
