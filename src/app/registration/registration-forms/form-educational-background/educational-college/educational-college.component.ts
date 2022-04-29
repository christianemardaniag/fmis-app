import { Component, Input, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-educational-college',
  templateUrl: './educational-college.component.html',
  styleUrls: ['./educational-college.component.css']
})
export class EducationalCollegeComponent implements OnInit {
  @Input() ctr = 0;

  constructor() { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

}
