import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Http, Headers, URLSearchParams } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

import { Condominium } from "./condominium";
import { Config } from "../config";

@Injectable()
export class CondominiumService {
  constructor(private http: Http) {}

  save(condominium: Condominium) {

    return this.http.post(Config.apiUrl + "condominium/",
      JSON.stringify({
        id: condominium.id,
        name: condominium.name,
        street: condominium.street,
        neighborhood: condominium.neighborhood,
        number: condominium.number,
        city: condominium.city,
        state: condominium.state,
        zipCode: condominium.zipCode,
        email: condominium.email,
        phone: condominium.phone,
        website: condominium.website,
        active: true              
      }),
      { headers: this.getCommonHeaders() }
    )
  }

  get() {
    return this.http.get(Config.apiUrl + "condominium/", 
      { headers: this.getCommonHeaders()})
      .map(response => response.json());
  }

  getCondominiumById(condominiumId: number) {
    return this.http.get(Config.apiUrl + "condominium/" + condominiumId, 
      { headers: this.getCommonHeaders()})
      .map(response => response.json());
  }

  deleteCondominiumById(condominiumId: number) {  
    return this.http.delete(Config.apiUrl + "condominium/" + condominiumId,
    { headers: this.getCommonHeaders()});
  }

  getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  }

  handleErrors(error: Response) {
    alert(error);    
    return Observable.throw(error);
  }
}