import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  email:string;
  password:string;
  invalidLogin = false;
  loginErrorinfo = false;
  showSpinner = false;
  userloginFormGroup: FormGroup;

  constructor(private authentificationService:AuthentificationService, private router:Router,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.userloginFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")],
      passwordCtrl:['',Validators.required],

    });
  }

  userLogin():void{
    this.showSpinner = true;
    this.authentificationService.logIn(this.email,this.password).subscribe(user=>{
      
      if(user.id != 0)
      {
        if(user.compteStatus == "Activated"){
        sessionStorage.setItem('user', user.lastName+" "+user.firstName);
        sessionStorage.setItem('role', user.type);

        this.router.navigate(['']);
        this.invalidLogin = false
        
        }
        else{
          this.router.navigate(['account-confirm', { id: user.id , email: user.email  }],{skipLocationChange: true, replaceUrl: false});
          this.invalidLogin = true
          sessionStorage.setItem('role', user.type);
        }
      }
      else{
        this.invalidLogin = true;
        this.loginErrorinfo = true;
      }
      this.showSpinner = false;
    });
  }
}