import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-civil-service',
  templateUrl: './form-civil-service.component.html',
  styleUrls: ['./form-civil-service.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm}]
})
export class FormCivilServiceComponent implements OnInit {
  civilServiceType = ["Career Service", "RA 1080 (board/bar) Under Special Laws", "CES", "CSEE Barangay Eligibility", "Driver's License"]
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
