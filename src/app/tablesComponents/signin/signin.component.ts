import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Adresse } from 'src/app/tables/Adresse';
import { Utilisateur } from 'src/app/tables/Utilisateur';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  formSignin : FormGroup 
  newAdresse : Adresse
  newUser : Utilisateur

  constructor(private formbuilder : FormBuilder, private httpClient : HttpClient, private route : Router) {
   
   }

  ngOnInit(): void {
  
  this.formSignin = this.formbuilder.group({
    name: new FormControl("", [Validators.required]),
    firstname: new FormControl("", [Validators.required]),
    pseudo: new FormControl("", [Validators.required]),
    mdp: new FormControl("", [Validators.required]),
    rue: new FormControl("", [Validators.required]),
    numero: new FormControl("", [Validators.required]),
    codePostal: new FormControl("", [Validators.required]),
    ville: new FormControl("", [Validators.required]),
    pays: new FormControl("", [Validators.required]),

  })

  }

  onSubmit() {
    if (this.formSignin.invalid) {
      alert("Formulaire invalide");
    } else {
      let adress : Adresse = {rue : '', numero : null, codePostal : '', ville : '', pays : ''}
      adress.rue = this.formSignin.get('rue').value
      adress.numero = this.formSignin.get("numero").value
      adress.codePostal = this.formSignin.get("codePostal").value
      adress.ville = this.formSignin.get("ville").value
      adress.pays = this.formSignin.get("pays").value
      this.newAdresse = adress
      let user : Utilisateur = {id : null, name : '', firstname : '', niveauAcces : '', pseudo : '', mdp : '', adresse : null, commandes : null}
      user.name = this.formSignin.get("name").value
      user.firstname = this.formSignin.get("firstname").value
      user.niveauAcces = "Utilisateur"
      user.pseudo = this.formSignin.get("pseudo").value
      user.mdp = this.formSignin.get("mdp").value
      user.adresse = this.newAdresse
      user.commandes = null
      this.newUser = user

      this.httpClient.post('http://localhost:8080/api/utilisateurs', this.newUser)
      .subscribe( () => {
        console.log("Utilisateur rajouté à la DB")
        this.route.navigate(['home']).then()
      }, (error) => console.log("l'ajout a merdé, voici l'erreure" + error))
    }
    location.reload()
  }
}
