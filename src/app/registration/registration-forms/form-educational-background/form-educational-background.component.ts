import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-form-educational-background',
  templateUrl: './form-educational-background.component.html',
  styleUrls: ['./form-educational-background.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm}]
})
export class FormEducationalBackgroundComponent implements OnInit {
  elemBasicEd = ['Primary Education', 'Not Graduated'];
  secondaryBasicEd = ['High School', 'Junior High School', 'Senior High School', 'Not Graduated'];
  
  constructor() { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

}
