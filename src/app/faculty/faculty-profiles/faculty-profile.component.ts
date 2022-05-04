import { Component, Input, OnInit } from '@angular/core';
import { Faculty } from 'src/app/model/faculty.model';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-faculty-profile',
  templateUrl: './faculty-profile.component.html',
  styleUrls: ['./faculty-profile.component.css']
})
export class FacultyProfileComponent implements OnInit {
  @Input() faculty: Faculty = new Faculty;
  constructor() { }

  ngOnInit(): void {
    
  }

}
