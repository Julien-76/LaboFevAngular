import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/tables/Commande';
import { Utilisateur } from 'src/app/tables/Utilisateur';

@Component({
  selector: 'app-mod-user',
  templateUrl: './mod-user.component.html',
  styleUrls: ['./mod-user.component.scss']
})
export class ModUserComponent implements OnInit {
  users : Utilisateur[] = []
  commandes : Commande[] = []
  newUser : Utilisateur
  confirmation : boolean = false

  constructor(private http : HttpClient) { }
  
  

  ngOnInit(): void {
    this.afficheUsers()
  }


  afficheUsers() {
    this.http.get('https://labofev.herokuapp.com/api/utilisateurs').subscribe(
      (response : Utilisateur[]) => {
        this.users = response;
      }
    )
  }

  upgrade(user : Utilisateur) {
    this.newUser = user
    this.newUser.niveauAcces = 'Admin'
    this.http.put('https://labofev.herokuapp.com/api/utilisateurs/' + user.id, this.newUser).subscribe(
      (response : boolean) => {
        if (response) {
          console.log('Utilisateur ugrapdé')
        } else {
          console.log('plantage')
        }
      })
      
  }

  downgrade(user : Utilisateur) {
    this.newUser = user
    this.newUser.niveauAcces = 'Utilisateur'
    this.http.put('https://labofev.herokuapp.com/api/utilisateurs/' + user.id, this.newUser).subscribe(
      (response : boolean) => {
        if (response) {
          console.log('Utilisateur rétrogradé')
        } else {
          console.log('plantage')
        }
      })
  }

  check(user : Utilisateur) {
    this.confirmation = true
  }

  supprimer(user : Utilisateur) {
    this.http.get('https://labofev.herokuapp.com/api/commandes').subscribe(
      (response : Commande[]) => {
        
        this.commandes = response
        
        this.checkCommandes(user)
      }
    )
    }
  checkCommandes(user : Utilisateur) {
    
    for(let com of this.commandes) {
      
      if (com.utilisateur.pseudo == user.pseudo) {
        
        this.http.delete('https://labofev.herokuapp.com/api/commandes/' + com.id).subscribe(
          () => {
            
            this.deleteUser(user)
          }
        )
      }
    }
  }

  deleteUser(user : Utilisateur) {
    console.log('3')
    this.http.delete('https://labofev.herokuapp.com/api/utilisateurs/' + user.id).subscribe(
      (response : boolean) => {
        
        if (response) {
          console.log('Utilisateur supprimé')
          this.afficheUsers()
        } else {
          console.log('plantage')
        }
    
      })
      
  }

  nein(){
    this.confirmation = false
  }
}
