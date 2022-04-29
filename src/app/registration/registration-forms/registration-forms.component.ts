import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-registration-forms',
  templateUrl: './registration-forms.component.html',
  styleUrls: ['./registration-forms.component.css'],
  
})
export class RegistrationFormsComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    $('[data-toggle="tooltip"]').tooltip();
  }

  onSubmit() {
    // console.log(form);
  }

  sameAsResident() {

  }
}
