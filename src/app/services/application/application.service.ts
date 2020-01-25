import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Application } from '../../models/Application';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  applicationUrl:string = 'http://localhost:8080/api/applications';

  constructor(private http:HttpClient) { }

  getAllApplications():Observable<Application[]> {
    return this.http.get<Application[]>(this.applicationUrl);
  }

  getApplicationById(id:number):Observable<Application> {
    return this.http.get<Application>(this.applicationUrl + '/' + id);
  }

  createApplication(application:Application):Observable<Application> {
    return this.http.post<Application>(this.applicationUrl, application, httpOptions);
  }

  updateApplication(application:Application):Observable<Application> {
    return this.http.put<Application>(this.applicationUrl, application, httpOptions);
  }

  deleteApplication(applicationId:number):Observable<Object> {
    return this.http.delete<Object>(this.applicationUrl + '/' + applicationId, httpOptions);
  }
}
