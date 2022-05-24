import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-seminars',
  templateUrl: './form-seminars.component.html',
  styleUrls: ['./form-seminars.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormSeminarsComponent implements OnInit {

  coverage = ['International', 'National', 'Regional', 'Local'];
  ldType = ['Managerial', 'Supervisory', 'Technical'];
  ctr = 0;
  entry = [1];
  

  constructor() { }

  ngOnInit(): void {
  }
  addEntry() {
    this.entry.push(1);
    this.ctr++;
  }

  

}
