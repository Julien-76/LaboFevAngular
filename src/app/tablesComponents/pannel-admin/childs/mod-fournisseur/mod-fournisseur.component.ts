import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/tables/Commande';
import { Fournisseur } from 'src/app/tables/Fournisseur';
import { Produit } from 'src/app/tables/Produit';

@Component({
  selector: 'app-mod-fournisseur',
  templateUrl: './mod-fournisseur.component.html',
  styleUrls: ['./mod-fournisseur.component.scss']
})
export class ModFournisseurComponent implements OnInit {
  fournisseurs : Fournisseur[] = []
  currentProduits : Produit[] = []
  commandes : Commande[] = []

  constructor(private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.http.get('https://labofev.herokuapp.com/api/fournisseurs').subscribe(
      (response : Fournisseur[]) => {
        this.fournisseurs = response
      }
    )
  }

  checkProduits(fournisseur : Fournisseur) {

    this.currentProduits = fournisseur.produits
    this.http.get('https://labofev.herokuapp.com/api/commandes').subscribe(
      (response : Commande[]) => {
        this.commandes = response
        this.deleteProduits(fournisseur) 
      }
      
    )
  }

  deleteProduits(fournisseur : Fournisseur) {
    console.log('On est dans le delete de commande et voici les produits : ' + this.currentProduits)
    let commandesASupprimer : number[] = []
    for(let prod of this.currentProduits) {
      
      for(let com of this.commandes) {
        
        for(let prod2 of com.produits) {
          
          if(prod2.name == prod.name) {
            commandesASupprimer.push(com.id)
          }
        }
      }
    }
    for(let commande of commandesASupprimer) {
      this.http.delete('https://labofev.herokuapp.com/api/commandes/' + commande).subscribe(
        () => {
          console.log('Encore une commande supprimée')
        }
      )}
    for(let prod of this.currentProduits) {
      this.http.delete('https://labofev.herokuapp.com/api/produits/' + prod.id).subscribe(
        () => {
          console.log('Produit supprimé')
        }
       ) 
    }
    this.http.delete('https://labofev.herokuapp.com/api/fournisseurs/' + fournisseur.id).subscribe(
      () => {
        console.log('Fournisseur supprimé')
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['admin', 'modiffournisseur']);
      }); 
      }
    )
    
  }

  ajouter() {
    this.router.navigate(['admin', 'ajoutfournisseur']).then()
  }

  modifProduits(fournisseur : Fournisseur) {
    this.currentProduits = fournisseur.produits
  }

}
