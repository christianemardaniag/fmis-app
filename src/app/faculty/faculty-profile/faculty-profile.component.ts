import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { Seminar } from '../../model/_seminar';
declare var jquery: any;
declare var $: any;

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
  arrangedSeminars = [{
    title: '',
    details: [{
      title: '',
      hours: 0,
      startDate: '',
      endDate: '',
      type: '',
      sponsored: '',
      coverage: '',
      certificate: []
    }]
  }];

  test = [
    {
      title: 'ABC',
      hours: 2,
      startDate: '2021-02-20',
      endDate: '2021-02-20',
      type: 'Managerial',
      sponsored: 'XYZ',
      coverage: 'Local',
      certificate: []
    },
    {
      title: 'ABCD',
      hours: 5,
      startDate: '2022-01-20',
      endDate: '2022-01-20',
      type: 'Managerial',
      sponsored: 'WXYZ',
      coverage: 'Regional',
      certificate: []
    },
    {
      title: 'C',
      hours: 3,
      startDate: '2020-04-20',
      endDate: '2020-04-20',
      type: 'Managerial',
      sponsored: 'XYZ',
      coverage: 'Local',
      certificate: []
    },
    {
      title: 'ABC',
      hours: 2,
      startDate: '2019-11-20',
      endDate: '2019-11-20',
      type: 'Managerial',
      sponsored: 'XYZ',
      coverage: 'Local',
      certificate: []
    },
  
  ]

  firebaseConfig = {
    apiKey: 'AIzaSyB9N-suydf9myRmwYPIoBUuxP6CI4CjnTo',
    authDomain: 'fmis-app.firebaseapp.com',
    databaseURL: 'https://fmis-app-default-rtdb.firebaseio.com',
    storageBucket: 'fmis-app.appspot.com'
  };
  firebaseApp = initializeApp(this.firebaseConfig);
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
    this.arrangeSeminars('yearly');
  }

  fetchData() {
    this.isFetching = true;
    this.facultyService.getFacultyById(this.id).subscribe(data => {
      this.faculty = data;
      this.isFetching = false;
      this.getCertificates();
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
    

  }

  a(a: any) {
    console.log(a.checked);
  }

}
