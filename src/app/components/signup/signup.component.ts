import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { User } from '../../models/User';
import { MatStepper } from '@angular/material/stepper';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  
  user:User = new User();
  
  confirmPassword:String;
  verificationCode:string;
  userId:number;
  isLinear = true;
  passwordsError =false; 
  verificationCodeError = false;
  disabledButtonCreateAccount = false;
  createAccountErrorMessage:string;
  userInfosFormGroup: FormGroup;
  userPasswordFormGroup:FormGroup;
  userConfirmAccountCreation:FormGroup;
  //email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _formBuilder: FormBuilder,private authentificationService:AuthentificationService
    , private router:Router) {}
/*
    getErrorMessage() {
      return this.email.hasError('required') ? 'You must enter a value' :
          this.email.hasError('email') ? 'Not a valid email' :
              '';
    }
*/
  ngOnInit() {

    this.userInfosFormGroup = this._formBuilder.group({
      firstNameCtrl: ['', Validators.minLength(4)],
      lastNameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.pattern("^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$")],
      phoneNumberCtrl: ['', Validators.pattern("[0-9]{10}")],
      addressNumberCtrl:['',Validators.minLength(10)]

    });

    this.userPasswordFormGroup = this._formBuilder.group({
      passwordCtrl:['',Validators.required],
      confirmPasswordCtrl:['',Validators.required]
    });

    this.userConfirmAccountCreation = this._formBuilder.group({
      userAccountToken:['',Validators.required]
    });
  } 

  signup(stepper: MatStepper){
    this.disabledButtonCreateAccount = true;

    if(this.user.password == this.confirmPassword)
    {
      
      this.authentificationService.signup(this.user).subscribe(user=>{
        if(user.id != 0){
          this.userId = user.id;
          stepper.next();
        }
        else{
          this.createAccountErrorMessage= "Error when creating the account";
          this.passwordsError = true;
        }
        this.disabledButtonCreateAccount = false;
      });
      this.passwordsError = false;
    }
    else{
      this.createAccountErrorMessage="The password are not identical";
      this.passwordsError = true;
      this.disabledButtonCreateAccount = false;

    }

  }

  accountVerification(){
    this.disabledButtonCreateAccount = true;
    this.authentificationService.accountVerification(this.verificationCode,this.userId).subscribe(response=>{
      console.log(response[0]);
      if(response[0] == "OK"){
        sessionStorage.setItem('user', this.user.lastName+" "+this.user.firstName);
        sessionStorage.setItem('role', "Candidate");
        this.router.navigate(['']);
        this.disabledButtonCreateAccount = false;

      }else{
        this.createAccountErrorMessage="The verification code is invalid";
        this.verificationCodeError = true;
        this.disabledButtonCreateAccount = false;

      }

    });
  }

}