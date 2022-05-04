import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-educational-graduate-studies',
  templateUrl: './educational-graduate-studies.component.html',
  styleUrls: ['./educational-graduate-studies.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm}]
})
export class EducationalGraduateStudiesComponent implements OnInit {
  @Input() ctr = 0;
  constructor() { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

}
