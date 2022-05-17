import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private baseUrl = "https://fmis-app-default-rtdb.firebaseio.com/";
  constructor(private http: HttpClient) {
    console.log("DATABASE: " + this.baseUrl);

  }

  getAllActiveFaculty() {
    return this.http.get<any>(this.baseUrl + 'faculty.json').pipe(map(responseData => {
      const facultyForApproval = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          const e = responseData[key];
          if (e.status == 'approved') {
            facultyForApproval.push({ ...responseData[key], id: key });
          }
        }
      }
      return facultyForApproval;
    }));
  }

  getAllApplication() {
    return this.http.get<any>(this.baseUrl + 'faculty.json').pipe(map(responseData => {
      const facultyForApproval = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          const e = responseData[key];
          if (e.status == 'for approval') {
            facultyForApproval.push({ ...responseData[key], id: key });
          }
        }
      }
      return facultyForApproval;
    }));
  }

  getFacultyById(id: string) {
    return this.http.get<any>(this.baseUrl + 'faculty/' + id + '.json');
  }

  updateInfo(id: string, info: any) {
    return this.http.patch(this.baseUrl + 'faculty/' + id + '.json', info);
  }

} // end
