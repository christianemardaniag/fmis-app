import { Component, OnInit } from '@angular/core';
import { FormArray, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  faculty: Faculty = new Faculty;
  id = localStorage.getItem("loggedID")!;
  gender = ['male', 'female'];
  civilStatus = ['single', 'married', 'widowed', 'separated'];
  email = '';
  sameAsResidentFlag = false;
  onRegistration = false;
  errorCont = false;
  errorMessage = '';


  constructor(private facultyService: FacultyService, private router: Router) { }

  ngOnInit(): void {
    this.facultyService.getFacultyById(this.id).subscribe(data => {
      this.faculty = data;
      console.log(data);
      this.email = this.faculty.email;
    });
    
  }

  sameAsResident(mainForm: NgForm) {
    this.sameAsResidentFlag = !this.sameAsResidentFlag;
    if (this.sameAsResidentFlag) {
      let residentHouse = mainForm.form.value.residentAddress.residentHouseNo;
      let residentStreet = mainForm.form.value.residentAddress.residentStreet;
      let residentSubdivision = mainForm.form.value.residentAddress.residentSubdivision;
      let residentCity = mainForm.form.value.residentAddress.residentCityProvince;
      let residentMunicipality = mainForm.form.value.residentAddress.residentMunicipality;
      let residentZipCode = mainForm.form.value.residentAddress.residentZipCode;
      mainForm.form.patchValue({
        permanentAddress: {
          permanentHouseNo: residentHouse,
          permanentStreet: residentStreet,
          permanentSubdivision: residentSubdivision,
          permanentCityProvince: residentCity,
          permanentMunicipality: residentMunicipality,
          permanentZipCode: residentZipCode,
        }
      });
    }
  }

  submitForm(f: NgForm) {
    let val = f.form.value;
    let currentPass = val.currentPassword;
    let newPass = val.newPassword;
    let conPass = val.confirmPassword;
    if (currentPass === this.faculty.password) {
      if (newPass == conPass) {
        this.onRegistration = true;
        this.setInfo(val);
        this.facultyService.updateInfo(this.id, this.faculty).subscribe(()=> {
          this.onRegistration = false;
          this.router.navigate(['/faculty', this.id]);
        });
      } else {
        this.errorCont = true;
        this.errorMessage = 'Incorrect Password';
      }
    } else {
      this.errorCont = true;
      this.errorMessage = 'Incorrect Password';
    }
  }

  setInfo(val: any) {
    this.faculty.nameExtension = val.nameExtension;
    this.faculty.birthDate = val.birthDate;
    this.faculty.civilStatus = val.civilStatus;
    this.faculty.gender = val.gender;
    this.faculty.height = val.height;
    this.faculty.weight = val.weight;
    this.faculty.bloodType = val.bloodType;
    this.faculty.citizenship = val.citizenship;
    //Contact Info
    this.faculty.email = val.email;
    this.faculty.alternativeEmail = val.alternativeEmail;
    this.faculty.mobileNumber = val.mobileNumber;
    this.faculty.telephoneNumber = val.telephoneNumber;
    // Resident Address
    this.faculty.residentAddress.houseNo = val.residentAddress.residentHouseNo;
    this.faculty.residentAddress.street = val.residentAddress.residentStreet;
    this.faculty.residentAddress.subdivision = val.residentAddress.residentSubdivision;
    this.faculty.residentAddress.cityProvince = val.residentAddress.residentCityProvince;
    this.faculty.residentAddress.municipality = val.residentAddress.residentMunicipality;
    this.faculty.residentAddress.zipCode = val.residentAddress.residentZipCode;
    // Permanent Address
    this.faculty.permanentAddress.houseNo = val.permanentAddress.permanentHouseNo;
    this.faculty.permanentAddress.street = val.permanentAddress.permanentStreet;
    this.faculty.permanentAddress.subdivision = val.permanentAddress.permanentSubdivision;
    this.faculty.permanentAddress.cityProvince = val.permanentAddress.permanentCityProvince;
    this.faculty.permanentAddress.municipality = val.permanentAddress.permanentMunicipality;
    this.faculty.permanentAddress.zipCode = val.permanentAddress.permanentZipCode;
    // Employee info
    this.faculty.gsis = val.gsis;
    this.faculty.pagibig = val.pagibig;
    this.faculty.philhealth = val.philhealth;
    this.faculty.sss = val.sss;
    this.faculty.tin = val.tin;
  }
}
