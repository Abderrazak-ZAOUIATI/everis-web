import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Offer } from '../../models/Offer';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  offerUrl:string = '';

  constructor(private http:HttpClient) { }

  getAllOffer():Observable<Offer[]> {
    return this.http.get<Offer[]>(this.offerUrl);
  }

  getOfferById(id:number):Observable<Offer> {
    return this.http.get<Offer>(this.offerUrl + '/' + id);
  }

  createOffer(offer:Offer):Observable<Offer> {
    return this.http.post<Offer>(this.offerUrl, Offer, httpOptions);
  }

  updateOffer(offer:Offer):Observable<Offer> {
    return this.http.put<Offer>(this.offerUrl, Offer, httpOptions);
  }

  deleteOffer(offer:Offer):Observable<Offer> {
    return this.http.delete<Offer>(this.offerUrl + '/' + offer.id, httpOptions);
  }
}
