import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';
import { getDatabase, ref, set} from "firebase/database";
import { initializeApp } from "firebase/app";

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  app = initializeApp(environment.firebase);
  db = getDatabase(this.app);
  
  constructor() {}
  
  ngOnInit(): void {
  }

  printWindow(){
    window.print();
  }

  registration() {
    // console.log(registrationForm.form.controls.email.value());
    let email = "j@va.com";
    let pass = "123425";
    set(ref(this.db, 'users'), {
      email: email,
      password: pass
    });
  }
}
