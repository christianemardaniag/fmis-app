import { Component, Input, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-educational-graduate-studies',
  templateUrl: './educational-graduate-studies.component.html',
  styleUrls: ['./educational-graduate-studies.component.css']
})
export class EducationalGraduateStudiesComponent implements OnInit {
  @Input() ctr = 0;
  constructor() { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

}
