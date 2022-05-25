import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { environment } from 'src/environments/environment';
import { ArrangedSeminars } from 'src/app/model/_arrangedSeminar';
import * as moment from 'moment';
import { ArrangeSeminarDetails } from 'src/app/model/_arrangedSeminarDetails';

declare var jquery: any;
declare var $: any;

interface month {
  month: string,
  year: string
}

@Component({
  selector: 'app-faculty-profile',
  templateUrl: './faculty-profile.component.html',
  styleUrls: ['./faculty-profile.component.css']
})
export class FacultyProfileComponent implements OnInit {
  @Output() refreshParent: EventEmitter<any> = new EventEmitter();
  faculty: Faculty = new Faculty;
  id: string = '';
  isFetching = false;
  isAdminApplication = false;
  isUploading = false;
  pos = localStorage.getItem('position')!;
  uploadProgress = 0;
  arrangedSeminars: ArrangedSeminars[] = [];

  firebaseApp = initializeApp(environment.firebase);
  metadata = { contentType: 'image/jpeg' };
  storage = getStorage();
  certificates: string[] = [];

  constructor(private route: ActivatedRoute,
    private facultyService: FacultyService,
    private router: Router) { }

  ngOnInit(): void {
    $(function () {
      $('[data-toggle="popover"]').popover('show')
    })

    this.route.paramMap.subscribe(
      params => {
        this.id = params.get('id')!;
      });
    this.fetchData();
    this.isAdminApplication = this.router.url.includes('application');
  }

  fetchData() {
    this.isFetching = true;
    this.facultyService.getFacultyById(this.id).subscribe(data => {
      this.faculty = data;
      this.isFetching = false;
      this.getCertificates();
      this.arrangeSeminars('yearly');
    })
  }

  async getCertificates() {
    if (this.faculty.certificates) {
      const cert = this.faculty.certificates;
      for (let i = 0; i < cert.length; i++) {
        const name = cert[i];
        this.certificates.push(await this.getUrl(name));
      }
    }
  }

  async getUrl(name: string) {
    const url = await getDownloadURL(ref(this.storage, 'certificates/' + name));
    return url;
  }



  changeStatus(id: string, status: string) {
    this.facultyService.updateInfo(id, { status: status }).subscribe(data => {
      this.fetchData();
      this.refreshParent.emit(data);
      this.router.navigate(['/main/application']);
    })
  }

  changeProfile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files!;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
    }
    let fileName = fileList[0].name;
    const storageRef = ref(this.storage, 'profile/' + fileName);
    const uploadTask = uploadBytesResumable(storageRef, fileList[0], this.metadata);
    uploadTask.on('state_changed',
      (snapshot) => {
        this.isUploading = true;
        this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + this.uploadProgress + '% done');
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
          this.isUploading = false;
          this.uploadProgress = 0;
          this.facultyService.updateInfo(this.id, { profilePicture: downloadURL }).subscribe(() => {
            this.faculty.profilePicture = downloadURL;
          })
        });
      }
    );
  }

  arrangeSeminars(val: string) {
    const seminars = this.faculty.seminars;
    let year: string[] = [];
    let month: month[] = [];
    for (const sem of seminars ? seminars : []) {
      let startDate = moment(sem.startDate);
      const y = startDate.format("YYYY");
      const m = startDate.format("MMMM");
      if (!year.includes(y)) {
        year.push(y);
      }
      if (!month.includes({ month: m, year: y })) {
        month.push({ month: m, year: y })
      }
    }
    this.arrangedSeminars = [];
    switch (val) {
      case 'yearly':
        this.arrangeSeminarsByYear(year, seminars);
        break;
      case 'monthly':
        this.arrangeSeminarsByMonth(month, seminars);
        break;
      case 'quarterly':
        this.arrangeSeminarsByQuarter(year, seminars);
        break;
    }
    console.log(this.arrangedSeminars);
  }

  arrangeSeminarsByDateRange(s: string, e?: string) {
    this.arrangedSeminars = [];
    const seminars = this.faculty.seminars;
    let start = moment();
    if(s) start = moment(s); 
    let end = moment();
    if(e) end = moment(e);
    let details: ArrangeSeminarDetails[] = [];
    for (const sem of seminars ? seminars : []) {
      let date = moment(sem.startDate);
      if (date.isBetween(start, end)) {
        details.push({
          title: sem.title,
          hours: sem.hours,
          startDate: sem.startDate,
          endDate: sem.endDate,
          type: sem.type,
          sponsored: sem.sponsored,
          coverage: sem.coverage
        });
      }
    }
    this.arrangedSeminars.push({title: start.format('LL') + ' to ' + end.format('LL'), details: details});
  }

  arrangeSeminarsByQuarter(year: string[], seminars: any) {
    for (const yy of year) {
      let q1: ArrangeSeminarDetails[] = [];
      let q2: ArrangeSeminarDetails[] = [];
      let q3: ArrangeSeminarDetails[] = [];
      let q4: ArrangeSeminarDetails[] = [];
      for (const sem of seminars ? seminars : []) {
        let startDate = moment(sem.startDate);
        const y = startDate.format("YYYY");
        if (yy === y) {
          switch (startDate.quarter()) {
            case 1:
              q1.push({
                title: sem.title, hours: sem.hours, startDate: sem.startDate,
                endDate: sem.endDate, type: sem.type, sponsored: sem.sponsored,
                coverage: sem.coverage
              });
              break;
            case 2:
              q2.push({
                title: sem.title, hours: sem.hours, startDate: sem.startDate,
                endDate: sem.endDate, type: sem.type, sponsored: sem.sponsored,
                coverage: sem.coverage
              });
              break;
            case 3:
              q3.push({
                title: sem.title, hours: sem.hours, startDate: sem.startDate,
                endDate: sem.endDate, type: sem.type, sponsored: sem.sponsored,
                coverage: sem.coverage
              });
              break;
            case 4:
              q4.push({
                title: sem.title, hours: sem.hours, startDate: sem.startDate,
                endDate: sem.endDate, type: sem.type, sponsored: sem.sponsored,
                coverage: sem.coverage
              });
              break;

            default:
              break;
          }
        }
      }
      if (q1.length) {
        this.arrangedSeminars.push({ title: yy + ' - 1st Quarter', details: q1 })
      }
      if (q2.length) {
        this.arrangedSeminars.push({ title: yy + ' - 2nd Quarter', details: q2 })
      }
      if (q3.length) {
        this.arrangedSeminars.push({ title: yy + ' - 3rd Quarter', details: q3 })
      }
      if (q4.length) {
        this.arrangedSeminars.push({ title: yy + ' - 4th Quarter', details: q4 })
      }
    }


  }

  arrangeSeminarsByMonth(month: month[], seminars: any) {
    for (const mon of month) {
      let details: ArrangeSeminarDetails[] = [];
      for (const sem of seminars ? seminars : []) {
        let startDate = moment(sem.startDate);
        const y = startDate.format("YYYY");
        const m = startDate.format("MMMM");
        if (mon.month === m && mon.year === y) {
          details.push({
            title: sem.title,
            hours: sem.hours,
            startDate: sem.startDate,
            endDate: sem.endDate,
            type: sem.type,
            sponsored: sem.sponsored,
            coverage: sem.coverage
          });
        }
      }
      this.arrangedSeminars.push({ title: mon.month + ' ' + mon.year, details: details });
    }
  }

  arrangeSeminarsByYear(year: string[], seminars: any) {
    for (const y of year) {
      let details: ArrangeSeminarDetails[] = [];
      for (const sem of seminars ? seminars : []) {
        let startDate = moment(sem.startDate);
        if (y == startDate.format('YYYY')) {
          details.push({
            title: sem.title,
            hours: sem.hours,
            startDate: sem.startDate,
            endDate: sem.endDate,
            type: sem.type,
            sponsored: sem.sponsored,
            coverage: sem.coverage
          });
        }
      }
      this.arrangedSeminars.push({ title: y, details: details });
    }
  }

  a(a: any) {
    console.log(a.checked);
  }

}
