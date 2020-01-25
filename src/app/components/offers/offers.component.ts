import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OfferService } from '../../services/offer/offer.service';
import { ApplicationService } from '../../services/application/application.service';
import { Offer } from '../../models/Offer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Application } from 'src/app/models/Application';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  displayedColumns: string[] = ['title', 'offre-date', 'description', 'number-of-application','status','action-menu'];
  displayedApplicationColumns: string[] = ['apply-date', 'candidate-name', 'email', 'phone-number','attached-files',
  'status','action'];
 
  createOfferFormGroup: FormGroup;
  offersDataSource:any;
  offerApplicationDataSource:any;

  isLoading = true; 
  isApplicationTabsLoading = true;
  offerDomain:string;
  selectedTabIndex: number = 0;

  offer:Offer = new Offer();

  domainList: string[] = ['Designer', 'Developper', 'Web', 'Php', 'Support','Graphic Designer','Project Manager','Développement Android','Program Manager'
  ,'Designer Web','Freelance','Internet','Software','Oracle','Informatique','Javascript','Systèmes Réseaux','Mysql','Excel','Maintenance Informatique','Migration','Windows','Concepteur','Data Manager','Python','Support Technique','Stage Informatique','Data Mining','Chef Projet Informatique','Développeur Javascript'];

  constructor(private offerService:OfferService,
              private formBuilder:FormBuilder,
              private applicationService:ApplicationService
              ){}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

      this.offerService.getAllOffers().subscribe(offers => {

      console.log(offers);
      this.isLoading = false; 
      this.offersDataSource = new MatTableDataSource<Offer>(offers);
      this.offersDataSource.paginator = this.paginator;
      }); 

      this.createOfferFormGroup = this.formBuilder.group({

        createOfferTitleCtrl:['',Validators.required],
        createOfferDescriptionCtrl:['',Validators.required],
        createOfferDomainCtrl:['',Validators.required],
      });
  }

  public doFilter = (value: string) => {
    this.offersDataSource.filter = value.trim().toLocaleLowerCase();
  }

  tabChange(event){
   // this.selectedTabIndex = 0;
  }

  public createOffer(){
    
      this.offer.publicationDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      this.offer.status = "Active";
      this.offer.numberOfApplications = 0;
      
      console.log(this.offer);
      console.log(this.offerDomain);
       
      this.offerService.createOffer(this.offer).subscribe(offerResult=>{

        console.log(offerResult);

        if(offerResult.id != 0){
          const data = this.offersDataSource.data;
          data.push(offerResult);
          this.offersDataSource.data = data;
        } 
      });
  }  

  deleteOffer(offer:Offer){
    
    if(confirm("Are you sure to delete this offer")){
    this.offerService.deleteOffer(offer.id).subscribe(result=>{
      console.log(result);
      if(result[0] == "Success")
      {
        this.offersDataSource.data = this.offersDataSource.data.filter(art => art !== offer);
      }
    });
  }
  }
  
  updateOffer(offer:Offer){

    this.offer = offer;
    this.selectedTabIndex =this.selectedTabIndex + 1;
      
}
  
  changeOfferStatus(offer:Offer){
  
    var message = "Do you want to activate this offer?";
  
    if(offer.status == "Active"){
      message = "Do you want to deactivate this offer?";
    }
    
    if(confirm(message)){
  
      this.offerService.changeOfferStatus(offer.id).subscribe(result => {
          if(result[0] === "Success"){
            
            this.offersDataSource = this.offerService.getAllOffers();
        }
        }, error => console.log(error));
  }
 }

 showOfferApplications(offerId:number){

      //offerApplicationDataSource
      this.selectedTabIndex = this.selectedTabIndex + 2;

      this.offerApplicationDataSource = [];
      this.offerService.getOfferApplications(offerId).subscribe(applicationsResult =>{

      if(applicationsResult.length != 0){
      this.isApplicationTabsLoading = false; 
      this.offerApplicationDataSource = new MatTableDataSource<Application>(applicationsResult);
      this.offerApplicationDataSource.paginator = this.paginator;
      
      console.log(applicationsResult);
      } 
      else{

        this.isApplicationTabsLoading = false;
      }
    },  
    error => {
      console.log(error);
    });
 }

 deleteApplication(application:Application){

  console.log("Application to delete: "+application.id);

  if(confirm("Are you sure to delete this application")){
  this.applicationService.deleteApplication(application.id).subscribe(result=>{

    if(result[0] === "Success"){

      this.offerApplicationDataSource.data = this.offerApplicationDataSource.data.filter(
        appl => appl !== application
        );

      alert("Application has been deleted");
    }
  }, 
  error=>{
    console.log(error);
  });
}
}

applicationResfuse(application:Application){

  application.status ="Refused";
  this.applicationService.updateApplication(application).subscribe(result=>{

    if(result.status === "Refused"){
      this.offerApplicationDataSource = this.offerService.getOfferApplications(application.offerDto.id);
      console.log("Operation saved");
    }
  },
  error=>{
    console.log(error);
  });
}
applicationAccept(application:Application){
  
  application.status = "Accepted";
  this.applicationService.updateApplication(application).subscribe(result=>{

    if(result.status === "Accepted"){
      this.offerApplicationDataSource = this.offerService.getOfferApplications(application.offerDto.id);
      console.log("Operation saved");
    }
  },
  error=>{
    console.log(error);
  });
}
callForInterview(application:Application){
  
  application.status = "Interview";
  this.applicationService.updateApplication(application).subscribe(result=>{

    if(result.status === "Interview"){
      this.offerApplicationDataSource = this.offerService.getOfferApplications(application.offerDto.id);
      console.log("Operation saved");
    }
  },
  error=>{
    console.log(error);
  });
}

}