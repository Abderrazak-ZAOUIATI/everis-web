import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification/authentification.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  verificationCode:string;
  email:string;
  userId:number;
  verificationCodeError =  false;
  createAccountErrorMessage:string;
  
  constructor(private route:ActivatedRoute,
    private router:Router,
    private authentificationService:AuthentificationService) { }

  ngOnInit() {

  this.route.params.subscribe(params => {
  this.userId = params['id'];
  this.email = params['email'];
  });
  }

  accountVerification(){
    
  this.authentificationService.accountVerification(this.verificationCode,this.userId).subscribe(response=>{
    console.log(response[0]);
    if(response[0] == "OK"){
      this.router.navigate(['login']);
      
    }else{
      this.createAccountErrorMessage="The verification code is invalid";
      this.verificationCodeError = true;
    }
  });

  }
}
