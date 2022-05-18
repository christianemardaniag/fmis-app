import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-work-experience',
  templateUrl: './form-work-experience.component.html',
  styleUrls: ['./form-work-experience.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm}]
})
export class FormWorkExperienceComponent implements OnInit {
  appointmentStatus = ["Permanent", "Temporary", "Casual", "Contractual"]
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
