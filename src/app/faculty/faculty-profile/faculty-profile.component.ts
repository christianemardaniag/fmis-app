import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/model/faculty.model';
import { FacultyService } from 'src/app/services/faculty.service';

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
  pos = localStorage.getItem('position')!;
  constructor(private route: ActivatedRoute,
    private facultyService: FacultyService,
    private router: Router) { }

  ngOnInit(): void {
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
      console.log(data);
    })
  }

  changeStatus(id: string, status: string) {
    this.facultyService.updateInfo(id, {status: status}).subscribe(data=>{
      this.fetchData();
      this.refreshParent.emit(data);
      this.router.navigate(['/main/application']);
    })
  }

  a(a: any) {
    console.log(a.checked);
  }

}
