import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commande } from 'src/app/tables/Commande';

@Component({
  selector: 'app-modifcommande',
  templateUrl: './modifcommande.component.html',
  styleUrls: ['./modifcommande.component.scss']
})
export class ModifcommandeComponent implements OnInit {
  commandes : Commande[]
  constructor(private http : HttpClient, private router : Router) { }

  ngOnInit(): void {
    this.afficheCommandes()
  }

  supprimer(i : number) {
    
    this.http.delete<Commande[]>('https://labofev.herokuapp.com/api/commandes/' + i).subscribe(
      (response) => {
        if (response) {
          console.log('c\'est supprimé')
        }
        this.afficheCommandes()
      })
  }

  afficheCommandes() {
    this.http.get('https://labofev.herokuapp.com/api/commandes').subscribe(
      (response : Commande[]) => {
        this.commandes = response;
      }
    )
  }
}
