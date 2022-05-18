import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-educational-college',
  templateUrl: './educational-college.component.html',
  styleUrls: ['./educational-college.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm}]
})
export class EducationalCollegeComponent implements OnInit {
  ctr = 0;
  entry = [1];

  constructor() { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

  addEntry() {
    this.entry.push(1);
    this.ctr++;
  }

}
