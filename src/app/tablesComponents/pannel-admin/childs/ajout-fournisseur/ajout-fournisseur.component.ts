import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Fournisseur } from 'src/app/tables/Fournisseur';

@Component({
  selector: 'app-ajout-fournisseur',
  templateUrl: './ajout-fournisseur.component.html',
  styleUrls: ['./ajout-fournisseur.component.scss']
})
export class AjoutFournisseurComponent implements OnInit {

  formFourn : FormGroup
  

  constructor(private formbuilder : FormBuilder, private http : HttpClient, private router : Router) { }

  ngOnInit(): void {

    this.formFourn = this.formbuilder.group({
      entreprise: new FormControl("", [Validators.required]),
      statutSocial: new FormControl("", [Validators.required]),
      secteur: new FormControl("", [Validators.required]),
    })
  }


  onSubmit() {
    let newFournisseur : Fournisseur = {id : null, entreprise : null, secteur : null, statutSocial : null, produits : [], dateInsertion : null, dateUpdate : null}
    if (this.formFourn.invalid) {
      alert('Formulaire invalide')
    } else {
    newFournisseur.entreprise = this.formFourn.get('entreprise').value
    newFournisseur.secteur = this.formFourn.get('secteur').value
    newFournisseur.statutSocial = this.formFourn.get('statutSocial').value
    this.http.post('https://labofev.herokuapp.com/api/fournisseurs', newFournisseur).subscribe(
      () => {
        alert('Fournisseur ajouté')
        this.router.navigate(['admin', 'modiffournisseur'])
      }
    ) 
    }
  }
}
