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

export class AuthentificationService {

  userUrl:string = 'http://localhost:8080/api/users';

  user:User = new User();

  constructor(private http:HttpClient) {}
  
  //Login
  logIn(email:string,password:string):Observable<User>{
  
    this.user.email = email;
    this.user.password = password;
    return this.http.post<User>(this.userUrl+'/login',this.user);
   }

   signup(user:User):Observable<User>{
  
    console.log("AuthentificationService: "+user);
    return this.http.post<User>(this.userUrl,user);
   }


   accountVerification(verificationCode:string,userId:number):Observable<Object>{
  
    console.log("verification code: "+verificationCode);
    return this.http.post<User>(this.userUrl+"/"+userId+"/account-verification",verificationCode);
   }


   isUserLoggedIn() {

    let user = sessionStorage.getItem('user')
    return !(user === null)
  }

  logOut() {
    
    sessionStorage.removeItem('user')
  }
 
}
