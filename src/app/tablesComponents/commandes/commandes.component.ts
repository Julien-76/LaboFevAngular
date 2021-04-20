import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Commande } from 'src/app/tables/Commande';
import { Produit } from 'src/app/tables/Produit';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss']
})
export class CommandesComponent implements OnInit {
  listeProduits : Array<Produit> = []
  produitSub : Subscription
  currentProduit : Produit = null
  afficheDetails : boolean = false
  panier : Array<Produit> = []
  nbreProduits : number
  
  


  constructor(private apiService : ApiServiceService) {

   }

  ngOnInit(): void {
    this.apiService.getAll('https://labofev.herokuapp.com/api/produits', 'produits')
    this.produitSub = this.apiService.produitSubject.subscribe(
      (prod : any[]) => {
        this.listeProduits = prod;
        console.log("--------> " + this.listeProduits)
      }
    )
    
  } 

  onDetails(produit : Produit) {
      this.currentProduit = produit
      this.afficheDetails = true
      let cpt : number = 0
    for(let prod of this.apiService.panier) {
      if (produit.name == prod.name) {
        cpt++
      }
    }
      this.nbreProduits = produit.quantite - cpt
      
  }

  addPanier(produit : Produit) { 
    
    if (this.nbreProduits <= 0) {
      alert('Produit en rupture de stock')
    } else {
    this.panier.push(produit)

    this.apiService.panier.push(produit); // pour pouvoir le récupérer dans l'espace perso
    console.log(this.apiService.panier)
    this.nbreProduits--
    }
  }
}
