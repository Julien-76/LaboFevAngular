import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Fournisseur } from '../tables/Fournisseur';
import { Produit } from '../tables/Produit';
import { Utilisateur } from '../tables/Utilisateur';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
fournisseurSubject = new Subject<any[]>();
produitSubject = new Subject<any[]>();
utilisateurSubject = new Subject<any[]>();
commandeSubject = new Subject<any[]>();

fournisseurs : Array<any>;
produits : Array<any>;
utilisateurs : Array<any>;
commandes : Array<any>;
currentUser : Utilisateur = null
panier : Array<Produit> = []
nbreProduit : number


  constructor(private httpClient : HttpClient) { }

setCurrentUser(utilisateur : Utilisateur) {
  this.currentUser = utilisateur
}

getAll(url : string, typeObjet : string) {

  this.httpClient.get<any>(url)
    .subscribe(
      (response) => {
        if (typeObjet == 'fournisseurs') {
          this.fournisseurs = response;
          this.fournisseurSubject.next(this.fournisseurs)
        }
        if (typeObjet == 'produits') {
          this.produits = response;
          this.produitSubject.next(this.produits)
        }
        if (typeObjet == 'utilisateurs') {
          this.utilisateurs = response;
          this.utilisateurSubject.next(this.utilisateurs)
        }
        if (typeObjet == 'commandes') {
          this.commandes = response;
          this.commandeSubject.next(this.commandes)
        }
        console.log("Ca passe au moins...")
      },
      (error) => {
        console.log('On y est pas encore mais on va y arriver !' + error)
      }
    )
}





}
