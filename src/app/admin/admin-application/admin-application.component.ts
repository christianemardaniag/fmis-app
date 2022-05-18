import { Component, OnInit } from '@angular/core';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-admin-application',
  templateUrl: './admin-application.component.html',
  styleUrls: ['./admin-application.component.css']
})
export class AdminApplicationComponent implements OnInit {
  faculty: Faculty[] = [];
  isFetching = false;
  searchTerm = '';
  appStatList: string[] = [];
  constructor(private facultyService: FacultyService) { }

  ngOnInit(): void {
    this.setAppList(true, 'for approval');
    
  }

  fetchData() {
    this.isFetching = true;
    this.facultyService.getAllApplicationByStatus(this.appStatList).subscribe(data => {
      this.faculty = data;
      this.isFetching = false;
    })
  }

  onActivate(componentReference: any) {
    componentReference.refreshParent.subscribe(() => {
      this.fetchData();
    })
  }

  setAppList(chk: boolean, key: string) {
    if (chk) {
      this.appStatList.push(key);
    } else {
      const index = this.appStatList.indexOf(key, 0);
      if (index > -1) {
        this.appStatList.splice(index, 1);
      }
    }
    console.log(this.appStatList);
    
    this.fetchData();    
  }


}
