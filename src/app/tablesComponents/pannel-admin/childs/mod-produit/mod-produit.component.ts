import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/tables/Commande';
import { Produit } from 'src/app/tables/Produit';

@Component({
  selector: 'app-mod-produit',
  templateUrl: './mod-produit.component.html',
  styleUrls: ['./mod-produit.component.scss']
})
export class ModProduitComponent implements OnInit {
  produits : Produit[] = []
  produitsByCommande : Produit[] = []
  commandes : Commande[] = []
  constructor(private http: HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.afficheProduits()
    this.afficheCommandes()
  }

  modifier(produit : Produit) {

  }

  supprimer(index : number) {
    this.http.delete('https://labofev.herokuapp.com/api/produits/' + index).subscribe(
      (response) => {
        if (response) {
          console.log('c\'est supprimé')
          this.afficheProduits()
        }
      }
    )
  }

  supprimerProduitDansCommande(index : number) {
    this.http.delete('https://labofev.herokuapp.com/api/produits/' + index).subscribe(
      (response) => {
        if (response) {
          console.log('c\'est supprimé')
        }
      }
    )
  }

  afficheProduits() {
    this.http.get('https://labofev.herokuapp.com/api/produits').subscribe(
      (response : Produit[]) => {
        this.produits = response;
      }
    )
  }

  afficheCommandes() {
    this.http.get('https://labofev.herokuapp.com/api/commandes').subscribe(
      (response : Commande[]) => {
        this.commandes = response;
      }
    )
  }

  afficheProduitsByCommandes(id : number) {
    this.http.get('https://labofev.herokuapp.com/api/commandes/' + id + '/produits').subscribe(
      (response : Produit[]) => {
        this.produitsByCommande = response;
      }
    )
  }

  check(produit : Produit) {
    let doublon : boolean = false
    let cpt = 0
    let compris = false
    let supprime = false
    console.log('il y a ' + this.commandes.length + ' commandes en cours')
    if (this.commandes.length > 0) {
      for(let commande of this.commandes) {
        cpt++
        console.log('compteur --> ' + cpt)
        this.http.get('http://localhost:8080/api/commandes/' + commande.id + '/produits').subscribe(
        (response : Produit[]) => {
          for (let prod of response) {
            console.log(prod.name + ' vs ' + produit.name)
            if (prod.name == produit.name) {
            doublon = true
            
            } 
          }
          if (cpt == this.commandes.length) {
            console.log('go condition')
            if (doublon) {
              if (!compris) {
                alert('Impossible de supprimer le produit, il est présent dans une commande en cours')
                compris = true
              }
            } else {
                if (!supprime) {
                  this.supprimer(produit.id)
                  supprime = true
                }
            }
          }
        })
      }
    } else {
      this.supprimer(produit.id)
    }
  }

  ajouter() {
    this.router.navigate(['admin', 'ajoutproduit']).then()
  }
}
