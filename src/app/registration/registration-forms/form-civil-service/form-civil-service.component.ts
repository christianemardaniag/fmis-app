import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-civil-service',
  templateUrl: './form-civil-service.component.html',
  styleUrls: ['./form-civil-service.component.css']
})
export class FormCivilServiceComponent implements OnInit {
  civilServiceType = ["Career Service", "RA 1080 (board/bar) Under Special Laws", "CES", "CSEE Barangay Eligibility", "Driver's License"]
  constructor() { }

  ngOnInit(): void {
  }

}
