import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-educational-vocational',
  templateUrl: './educational-vocational.component.html',
  styleUrls: ['./educational-vocational.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm}]
})
export class EducationalVocationalComponent implements OnInit {
  @Input() ctr = 0;
  constructor() { }

  ngOnInit(): void {    
    $('[data-toggle="tooltip"]').tooltip();
  }

}
