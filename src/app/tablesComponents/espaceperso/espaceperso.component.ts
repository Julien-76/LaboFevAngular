import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Commande } from 'src/app/tables/Commande';
import { Produit } from 'src/app/tables/Produit';
import { Utilisateur } from 'src/app/tables/Utilisateur';

@Component({
  selector: 'app-espaceperso',
  templateUrl: './espaceperso.component.html',
  styleUrls: ['./espaceperso.component.scss']
})
export class EspacepersoComponent implements OnInit {

  currentUser : Utilisateur

  compAdmin : boolean = false
  
  admin : boolean = false
  donnees : boolean = false
  commandes : boolean = false
  panier : boolean = false
  formulaire : boolean = false
  mdp : boolean = false
  formUpdate : FormGroup
  monPanier : Array<Produit>
  formPayement : FormGroup
  newCommande : Commande = {id : null, reference : null, dateCreation : null, estPaye : null, moyenDePayement : null, produits : [], utilisateur : null}

  constructor(private apiService : ApiServiceService, private router: Router, private formbuilder : FormBuilder, private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.currentUser = this.apiService.currentUser
    this.formUpdate = this.formbuilder.group({
      donnee : new FormControl("", [Validators.required]),
      newDonnee : new FormControl("", [Validators.required]),
      mdp : new FormControl("")
    })


    this.monPanier = this.apiService.panier;
    console.log("INSTAN ! ! !" + this.monPanier);
    this.formPayement = this.formbuilder.group({
      paiement : new FormControl("", [Validators.required])
    })

    if (this.currentUser.niveauAcces == "Admin") {
      this.admin = true
    }
    
  }

  afficherDonnees() {
    this.donnees = true
  }

  cacheDonnees() {
    this.donnees = false
  }

  afficheCommandes() {
    this.commandes = true
  }

  cacheCommandes() {
    this.commandes = false
  }

  affichePanier() {
    this.panier = true
  }

  affichePanel() {
    this.router.navigate(['admin']).then;
  }

  cachePanier() {
    this.panier = false
  }

  getFormulaire() {
    this.formulaire = true
  }

  onSubmit() {
    let modif = this.formUpdate.get("newDonnee").value
    let champ = this.formUpdate.get("donnee").value
    switch (champ) {
      case "name" : this.httpClient.patch('http://localhost:8080/api/utilisateurs/' + this.currentUser.id, 
      { "name" : modif }  
      )
     .subscribe(
       () => {
         console.log("Donnée modifiée")
       }, (error) => console.log("Badaboum ! " + error)
     );
     this.currentUser.name = modif;  break;
      case "firstname" : this.httpClient.patch('http://localhost:8080/api/utilisateurs/' + this.currentUser.id, 
      { "firstname" : modif }  
      )
     .subscribe(
       () => {
         console.log("Donnée modifiée")
       }, (error) => console.log("Badaboum ! " + error)
     );
     this.currentUser.firstname = modif; break;
      case "pseudo" : this.httpClient.patch('http://localhost:8080/api/utilisateurs/' + this.currentUser.id, 
      { "pseudo" : modif }  
      )
     .subscribe(
       () => {
         console.log("Donnée modifiée")
       }, (error) => console.log("Badaboum ! " + error)
     );
     this.currentUser.pseudo = modif; break;
      case "mdp" : this.mdp = true; break
      case "rue" :alert("C'est interdit par la loi de changer d'adresse, il faut vous rendre à votre maison communale pour ça ! ! !"); break; 
      case "numero" :alert("C'est interdit par la loi de changer d'adresse, il faut vous rendre à votre maison communale pour ça ! ! !"); break; 
      case "ville" :alert("C'est interdit par la loi de changer d'adresse, il faut vous rendre à votre maison communale pour ça ! ! !"); break;
      case "pays" :alert("C'est interdit par la loi de changer d'adresse, il faut vous rendre à votre maison communale pour ça ! ! !"); break; 
      case "codePostal" :alert("C'est interdit par la loi de changer d'adresse, il faut vous rendre à votre maison communale pour ça ! ! !"); break; 
    }
    console.log("voilà le champ à modifier --> " + champ + " <-- et voici la nouvelle : --> " + modif + " <--")
    
  }

  changeMdp() {
    
    if (this.currentUser.mdp == this.formUpdate.get("mdp").value) {
      this.httpClient.patch('http://localhost:8080/api/utilisateurs/' + this.currentUser.id, 
      { "mdp" : this.formUpdate.get("newDonnee").value }  
      ).subscribe(
        () => {
          console.log("Donnée modifiée")
        }, (error) => console.log("Badaboum ! " + error))
    } else {
      alert("Mot de passe incorrect")
    }
  }

  setCommande() {
    this.newCommande.reference = String(Math.random()*1000)
    this.newCommande.dateCreation = Date.now.prototype
    if (this.newCommande.moyenDePayement == "") {
      
      this.newCommande.moyenDePayement = null
    }
    if (this.newCommande.moyenDePayement == null) {
      
      this.newCommande.estPaye = false
    } else {
      this.newCommande.estPaye = true
      
    }
    this.newCommande.produits = this.monPanier
    this.newCommande.utilisateur = this.currentUser
    for(let com of this.newCommande.utilisateur.commandes) {
      com.utilisateur = null
    }
    console.log('Voici la commande que nous allons pousser : ' + this.newCommande)
    this.httpClient.post('http://localhost:8080/api/commandes', this.newCommande)
    .subscribe(
      () => {
        console.log("Commande ajoutée à la DB")
        let maj : String[] = []
        for(let prod of this.apiService.panier) {
          let suivant : boolean = false
          for(let check of maj) {
            if (prod.name == check) {
              suivant = true
            }
          }
          if (!suivant) {
          let cpt = 0
          for(let name of this.apiService.panier) {
            if (prod.name == name.name) {
              cpt++
            }
          }
          let patch = prod.quantite - cpt
          console.log('Patch incomming à ' + patch)
          this.httpClient.patch('http://localhost:8080/api/produits/' + prod.id, {
            "quantite" : patch
          }).subscribe(
            () => {
              console.log('quantité mise à jour')
            }, (error : Error) => {
              console.log('Bardaf --> ' + error)
            }
          )
          maj.push(prod.name)
          }
        }
        
        this.apiService.panier = []
      },
      (error) => console.log("Bim Bam Boum..." + error)
    )
      this.monPanier = []
      this.currentUser.commandes.push(this.newCommande)
      this.newCommande = {id : null, reference : null, dateCreation : null, estPaye : null, moyenDePayement : null, produits : [], utilisateur : null}

     
      this.router.navigate(['espaceperso']).then()
      
  }
    
  payementOk() {
    this.newCommande.moyenDePayement = this.formPayement.get("paiement").value
    console.log(" voila le moyen de paiement dans la variable : " + this.newCommande.moyenDePayement)
  }
}
