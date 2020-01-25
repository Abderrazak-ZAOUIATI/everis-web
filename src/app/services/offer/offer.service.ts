import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Offer } from '../../models/Offer';
import { Application } from 'src/app/models/Application';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class OfferService {

  offerUrl:string = 'http://localhost:8080/api/offers';

  constructor(private http:HttpClient) { }

  getAllOffers():Observable<Offer[]> {
    return this.http.get<Offer[]>(this.offerUrl);
  }

  getOfferById(id:number):Observable<Offer> {
    return this.http.get<Offer>(this.offerUrl + '/' + id);
  }

  createOffer(offer:Offer):Observable<Offer> {
  
    return this.http.post<Offer>(this.offerUrl, offer, httpOptions);
  }

  updateOffer(offer:Offer):Observable<Offer> {

    return this.http.put<Offer>(this.offerUrl, offer, httpOptions);
  }
 
  deleteOffer(offerId:number):Observable<Offer> {
    return this.http.delete<Offer>(this.offerUrl + '/' + offerId, httpOptions);
  }

  changeOfferStatus(offerId:number):Observable<Object>{

    var params = new HttpParams().set("offerId",offerId.toString());
    return this.http.put<Object>(this.offerUrl+"/status",params);
  }

  getOfferApplications(offerId:number):Observable<Application[]> {
    return this.http.get<Application[]>(this.offerUrl + '/' + offerId + "/applications");
  }
}
