import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Adresse } from '../tables/Adresse';
import { Commande } from '../tables/Commande';
import { Utilisateur } from '../tables/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  BASE_URL: string = 'http://localhost:8080'
  _token: string = null
  mdpNC : string = null

  constructor(private httpClient : HttpClient) { }


  loginForToken(pseudo: string, mdp: string): void {
    console.log(pseudo + " " + mdp)
    this.httpClient.post(this.BASE_URL + '/login', {
      pseudo: pseudo,
      mdp: mdp
    }, {observe: "response"}).subscribe(response => {
      this._token = response.headers.get("Authorization").replace("Bearer ", "")
      console.log('pas encore dans le LS ' + this._token)
      console.log("on passe ici ?")
      localStorage.setItem("token", this._token) 
      })
      
  }

}

export interface userAdmin {

  id : number,
  name : String,
  firstname : String,
  niveauAcces : String,
  pseudo : String,
  mdp : String,
  adresse : Adresse,
  commandes : Array<Commande>
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}
