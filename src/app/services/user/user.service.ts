import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  userUrl:string = 'http://localhost:8080/api/users';

  constructor(private http:HttpClient) { }

  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getUserById(id:number):Observable<User> {
    return this.http.get<User>(this.userUrl + '/' + id);
  }

  createUser(user:User):Observable<User> {
    return this.http.post<User>(this.userUrl, user, httpOptions);
  }

  updateUser(user:User):Observable<User> {
    return this.http.put<User>(this.userUrl, user, httpOptions);
  }

  deleteUser(user:User):Observable<User> {
    return this.http.delete<User>(this.userUrl + '/' + user.id, httpOptions);
  }
}
