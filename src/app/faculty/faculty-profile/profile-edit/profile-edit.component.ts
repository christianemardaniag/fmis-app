import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Faculty } from 'src/app/model/faculty.model';
import { CivilService } from 'src/app/model/_civilService';
import { Education } from 'src/app/model/_education';
import { Seminar } from 'src/app/model/_seminar';
import { Work } from 'src/app/model/_work';
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
  elemBasicEd = ['Primary Education', 'Not Graduated'];
  secondaryBasicEd = ['High School', 'Junior High School', 'Senior High School', 'Not Graduated'];
  civilServiceType = ["Career Service", "RA 1080 (board/bar) Under Special Laws", "CES", "CSEE Barangay Eligibility", "Driver's License"];
  appointmentStatus = ["Permanent", "Temporary", "Casual", "Contractual"];
  coverage = ['International', 'National', 'Regional', 'Local'];
  ldType = ['Managerial', 'Supervisory', 'Technical'];
  fetchingData = false;
  vocationalCtr = 0;
  collegeCtr = 0;
  graduateStudiesCtr = 0;
  civilServiceCtr = 0;
  workCtr = 0;
  seminarCtr = 0;
  vocationalEntry: Education[] = [];
  collegeEntry: Education[] = [];
  graduateStudiesEntry: Education[] = [];
  civilServiceEntry: CivilService[] = [];
  workEntry: Work[] = [];
  seminarEntry: Seminar[] = [];
  certificates: string[] = [];
  firebaseConfig = {
    apiKey: 'AIzaSyB9N-suydf9myRmwYPIoBUuxP6CI4CjnTo',
    authDomain: 'fmis-app.firebaseapp.com',
    databaseURL: 'https://fmis-app-default-rtdb.firebaseio.com',
    storageBucket: 'fmis-app.appspot.com'
  };
  firebaseApp = initializeApp(this.firebaseConfig);
  metadata = { contentType: 'image/jpeg' };
  storage = getStorage();
  certList: FileList | null = null;
  cert: string[] = [];
  certOnDb: string[] = [];

  constructor(private facultyService: FacultyService, private router: Router) { }

  ngOnInit(): void {
    this.fetchingData = true;
    this.facultyService.getFacultyById(this.id).subscribe(data => {
      this.faculty = data;
      this.fetchingData = false;
      this.email = this.faculty.email;
      this.vocationalCtr = this.faculty.vocational?.length || 0;
      this.collegeCtr = this.faculty.college?.length || 0;
      this.graduateStudiesCtr = this.faculty.graduateStudies?.length || 0;
      this.civilServiceCtr = this.faculty.civilService?.length || 0;
      this.workCtr = this.faculty.workExperience?.length || 0;
      this.seminarCtr = this.faculty.seminars?.length || 0;
      this.vocationalEntry = (this.faculty.vocational ? this.faculty.vocational : this.vocationalEntry);
      this.collegeEntry = (this.faculty.college ? this.faculty.college : this.collegeEntry);
      this.graduateStudiesEntry = (this.faculty.graduateStudies ? this.faculty.graduateStudies : this.graduateStudiesEntry);
      this.civilServiceEntry = (this.faculty.civilService ? this.faculty.civilService : this.civilServiceEntry);
      this.workEntry = (this.faculty.workExperience ? this.faculty.workExperience : this.workEntry);
      this.seminarEntry = (this.faculty.seminars ? this.faculty.seminars : this.seminarEntry);
      this.getCertificates();
    });

  }

  async getCertificates() {
    if (this.faculty.certificates) { 
      this.certOnDb = this.faculty.certificates;
      this.cert = this.certOnDb;
      for (let i = 0; i < this.certOnDb.length; i++) {
        const name = this.certOnDb[i];        
        this.certificates.push(await this.getUrl(name));
      }      
    }
  }

  async getUrl(name: string) {
    const url = await getDownloadURL(ref(this.storage, 'certificates/' + name));
    return url;
  }

  certOnChange(e: Event) {
    this.cert = this.certOnDb;
    this.certList = (<HTMLInputElement>e.target).files;
    for (let i = 0; i < this.certList!.length; i++) {
      const element = this.certList?.item(i);
      this.cert.push(element?.name!);
    }
  }

  async removeCert(name:string, event: any) {
    const index = this.certOnDb.indexOf(name);
    this.certOnDb.splice(index, 1);    
    event.path[1].className = "d-none";
  }

  uploadFile(files: FileList) {
    if (files.length == 0) {
      return false;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i)!;
      const storageRef = ref(this.storage, 'certificates/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, this.metadata);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log("storage/unauthorized");
              break;
            case 'storage/canceled':
              console.log('storage/canceled');
              break;
            case 'storage/unknown':
              console.log('storage/unknown');
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
    }
    return true;
  }

  addVocationalEntry() {
    let x: Education = {
      school: '',
      basicEducation: '',
      startDate: new Date,
      endDate: new Date,
      level: '',
      yearGraduated: '',
      scholarship: ''
    }
    this.vocationalEntry.push(x);
    this.vocationalCtr++;
  }

  addCollegeEntry() {
    let x: Education = {
      school: '',
      basicEducation: '',
      startDate: new Date,
      endDate: new Date,
      level: '',
      yearGraduated: '',
      scholarship: ''
    }
    this.collegeEntry.push(x);
    this.collegeCtr++;
  }

  addGraduateStudiesEntry() {
    let x: Education = {
      school: '',
      basicEducation: '',
      startDate: new Date,
      endDate: new Date,
      level: '',
      yearGraduated: '',
      scholarship: ''
    }
    this.graduateStudiesEntry.push(x);
    this.graduateStudiesCtr++;
  }

  addCivilServiceEntry() {
    let x: CivilService = {
      type: '',
      rating: '',
      examinationDate: new Date,
      examinationPlace: '',
      licenseNumber: '',
      licenseValidity: new Date
    }
    this.civilServiceEntry.push(x);
    this.civilServiceCtr++;
  }

  addWorkEntry() {
    let x: Work = {
      position: '',
      company: '',
      startDate: new Date,
      endDate: new Date,
      salary: 0,
      jobGrade: '',
      appointmentStatus: '',
      gov: '',
    }
    this.workEntry.push(x);
    this.workCtr++;
  }

  addSeminarEntry() {
    let x: Seminar = {
      title: '',
      hours: 0,
      startDate: new Date,
      endDate: new Date,
      type: '',
      sponsored: '',
      coverage: ''
    }
    this.seminarEntry.push(x);
    this.seminarCtr++;
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
    console.log(val);
    
    let currentPass = val.currentPassword;
    let newPass = val.newPassword;
    let conPass = val.confirmPassword;
    if (currentPass === this.faculty.password) {
      if (newPass == conPass) {
        this.onRegistration = true;
        this.setInfo(val);
        this.facultyService.updateAll(this.id, this.faculty).subscribe(() => {
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
    // Elementary
    this.faculty.elementary.school = val.elementary.elementarySchool;
    this.faculty.elementary.basicEducation = val.elementary.elemBasicEducation;
    this.faculty.elementary.startDate = val.elementary.elemAttendanceStart;
    this.faculty.elementary.endDate = val.elementary.elemAttendanceEnd;
    this.faculty.elementary.level = val.elementary.elemHighestLevel;
    this.faculty.elementary.yearGraduated = val.elementary.elemYearGraduate;
    this.faculty.elementary.scholarship = val.elementary.elemScholarship;
    // Secondary
    this.faculty.secondary.school = val.secondary.secondarySchool;
    this.faculty.secondary.basicEducation = val.secondary.secondaryBasicEducation;
    this.faculty.secondary.startDate = val.secondary.secondaryAttendanceStart;
    this.faculty.secondary.endDate = val.secondary.secondaryAttendanceEnd;
    this.faculty.secondary.level = val.secondary.secondaryHighestLevel;
    this.faculty.secondary.yearGraduated = val.secondary.secondaryYearGraduate;
    this.faculty.secondary.scholarship = val.secondary.secondaryScholarship;
    // Vocational
    this.faculty.vocational = [];
    this.faculty.college = [];
    this.faculty.graduateStudies = [];
    this.faculty.civilService = [];
    this.faculty.workExperience = [];
    this.faculty.seminars = [];
    this.setupEducationalMultipleEntry(this.faculty.vocational, val.vocational);
    // College
    this.setupEducationalMultipleEntry(this.faculty.college, val.college);
    // Graduate Studies
    this.setupEducationalMultipleEntry(this.faculty.graduateStudies, val.graduateStudies);
    // Civil Service
    this.setupCivilServiceMultipleEntry(this.faculty.civilService, val.civilService);
    // Work Experience
    this.setupWorkExperienceMultipleEntry(this.faculty.workExperience, val.workExperience);
    // Seminars
    this.setupSeminarsMultipleEntry(this.faculty.seminars, val.seminars);
    // Certificates
    this.faculty.certificates = this.cert;
    if(this.certList) {
      this.uploadFile(this.certList!);
    }
    // // Account
    this.faculty.password = val.newPassword;
  }

  setupEducationalMultipleEntry(educ: any, val: any) {
    for (let i = 0; i < val.ctr; i++) {
      let x = val[i];
      let v: Education = {
        school: x.school,
        basicEducation: x.basicEducation,
        startDate: x.attendanceStart,
        endDate: x.attendanceEnd,
        level: x.highestLevel,
        yearGraduated: x.yearGraduate,
        scholarship: x.scholarship
      };
      educ.push(v);
    }
  }

  setupCivilServiceMultipleEntry(cv: any, val: any) {
    for (let i = 0; i < val.ctr; i++) {
      let x = val[i];
      let v: CivilService = {
        type: x.civilServiceType,
        rating: x.rating,
        examinationDate: x.examinationDate,
        examinationPlace: x.examinationPlace,
        licenseNumber: x.licenseNumber,
        licenseValidity: x.licenseValidity
      };
      cv.push(v);
    }
  }

  setupWorkExperienceMultipleEntry(cv: any, val: any) {
    for (let i = 0; i < val.ctr; i++) {
      let x = val[i];
      let v: Work = {
        position: x.position,
        company: x.company,
        startDate: x.startDate,
        endDate: x.endDate,
        salary: x.salary,
        jobGrade: x.jobGrade,
        appointmentStatus: x.appointmentStatus,
        gov: x.gov
      };
      cv.push(v);
    }
  }
  setupSeminarsMultipleEntry(cv: any, val: any) {
    for (let i = 0; i < val.ctr; i++) {
      let x = val[i];
      let v: Seminar = {
        title: x.title,
        hours: x.hours,
        startDate: x.startDate,
        endDate: x.endDate,
        type: x.ldType,
        sponsored: x.sponsored,
        coverage: x.coverage
      };
      cv.push(v);
    }
  }

}
