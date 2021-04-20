import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from './services/admin.service';
import { ApiServiceService } from './services/api-service.service';
import { AuthService } from './services/auth.service';
import { Utilisateur } from './tables/Utilisateur';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LaboFev';
  formLogin : FormGroup
  pseudo : string = ""
  mdp : string = ""
  apiUtilisateurs : Utilisateur[] = []
  utilSub : Subscription
  userSub : Subscription
  isLogin : boolean = false
  currentUser : Utilisateur
  BASE_URL: string = "https://labofev.herokuapp.com"
  _token : string = null

  constructor(private formbuilder : FormBuilder, private adminService: AdminService, private httpClient : HttpClient, private apiService : ApiServiceService, private router : Router) {
    
  }
  
  ngOnInit() : void {
    this.formLogin = this.formbuilder.group({
      pseudo : new FormControl("", [Validators.required]),
      mdp : new FormControl("", [Validators.required])
    })
  }

  onSubmit() {
    localStorage.clear()
    this.pseudo = this.formLogin.get('pseudo').value
    this.mdp = this.formLogin.get('mdp').value
    
    this.adminService.mdpNC = this.mdp
    this.httpClient.get('https://labofev.herokuapp.com/api/utilisateurs').subscribe(
      (util : Utilisateur[]) => {
        this.apiUtilisateurs = util
        
        this.compare(this.apiUtilisateurs, this.pseudo)
        
      }
    )
    
      
      
      
  }
  compare(utilisateurs : Utilisateur[], pseudo : String) {
      for (let utilisateur of utilisateurs) {
        
        if (utilisateur.pseudo == pseudo) {
          
          
          
          this.currentUser = utilisateur
          this.apiService.currentUser = this.currentUser
          this.isLogin = true
          
          this.adminService.loginForToken(this.apiService.currentUser.pseudo, this.adminService.mdpNC)
        
          
      }
        
      
    }
    
  }

  

  checkToken(utilisateur: Utilisateur) : void {
    if ( localStorage.getItem('token') != null) {
      
      this.currentUser = utilisateur
      this.isLogin = true;
   } else { 
     this.isLogin = false
   }
  }

  logOut() {
    this.isLogin = false
    localStorage.removeItem('token')
    this.atHome()
  }
  getProduits() {
    this.router.navigate(['produits']).then();
  }

  getFournisseurs() {
    this.router.navigate(['fournisseurs']).then();
  }

  signIn() {
    this.router.navigate(['signin']).then();
  }

  atHome() {
    this.router.navigate(['']).then()
  }

  espacePerso(){
    this.router.navigate(['espaceperso']).then()
  }

  setCommande() {
    if (!this.isLogin) {
      alert('Il faut être logué pour pouvoir faoire une commande')
    } else {
      this.router.navigate(['commandes']).then();
    }
  }

  reload() {
    this.atHome()
  }

}
