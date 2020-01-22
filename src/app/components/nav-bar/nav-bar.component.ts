import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification/authentification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userRole:string;

  constructor(private authentificationService:AuthentificationService ){
  }
  ngOnInit() {

    if(sessionStorage.getItem('role') != null)
    this.userRole = sessionStorage.getItem('role');
    else
    this.userRole = "Candidate";

  }

}
