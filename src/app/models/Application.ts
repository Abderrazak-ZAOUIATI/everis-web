import { User } from './User';
import { Offer } from './Offer';

export class Application {
    id:number;
	applicationDate:string;
    status:string; 
    userDto:User;
    attachedFiles:String;
    offerDto:Offer;
}