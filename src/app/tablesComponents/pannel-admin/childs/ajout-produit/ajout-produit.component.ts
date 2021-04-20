import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Fournisseur } from 'src/app/tables/Fournisseur';
import { Produit } from 'src/app/tables/Produit';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.scss']
})
export class AjoutProduitComponent implements OnInit {

  formProd : FormGroup
  fournisseurs : Fournisseur[] = []

  constructor(private formbuilder : FormBuilder, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.http.get('https://labofev.herokuapp.com/api/fournisseurs').subscribe(
      (response : Fournisseur[]) => {
        this.fournisseurs = response
      }
    )
    this.formProd = this.formbuilder.group({
      name: new FormControl("", [Validators.required]),
      description : new FormControl("", [Validators.required]),
      categorie: new FormControl("", [Validators.required]),
      prix: new FormControl("", [Validators.required]),
      quantite: new FormControl("", [Validators.required]),
      tva: new FormControl("", [Validators.required]),
      fournisseur: new FormControl("", [Validators.required]),
    })
  }

  onSubmit() {
    if (this.formProd.invalid) {
      alert('formulaire invalide')
    } else {
      let newProduit : Produit = {id: null, name : null, description : null, categorie : null, prixAchat : null, quantite : null, tva : null, fournisseur :null, dateEntree :null, datePeremption : null, imageProduit : null, dateUpdate: null}
      newProduit.name = this.formProd.get('name').value
      newProduit.description = this.formProd.get('description').value
      newProduit.categorie = this.formProd.get('categorie').value
      newProduit.prixAchat = this.formProd.get('prix').value
      newProduit.quantite = this.formProd.get('quantite').value
      newProduit.tva = this.formProd.get('tva').value
      newProduit.fournisseur = this.formProd.get('fournisseur').value
      console.log(this.formProd.get('fournisseur').value)
      this.http.post('https://labofev.herokuapp.com/api/produits', newProduit).subscribe(
        () => {
          alert('Produit rajouté')
          this.router.navigate(['admin', 'modifproduit']).then()
        }
      )
    }
  
  }


}
