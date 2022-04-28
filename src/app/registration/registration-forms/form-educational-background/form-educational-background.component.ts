import { Component, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-educational-background',
  templateUrl: './form-educational-background.component.html',
  styleUrls: ['./form-educational-background.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm}]
})
export class FormEducationalBackgroundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
