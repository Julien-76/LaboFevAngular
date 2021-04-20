import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AdminService } from 'src/app/services/admin.service';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Commande } from 'src/app/tables/Commande';
import { Fournisseur } from 'src/app/tables/Fournisseur';
import { Produit } from 'src/app/tables/Produit';
import { Utilisateur } from 'src/app/tables/Utilisateur';

@Component({
  selector: 'app-pannel-admin',
  templateUrl: './pannel-admin.component.html',
  styleUrls: ['./pannel-admin.component.scss']
})
export class PannelAdminComponent implements OnInit {

    utilisateurs : Utilisateur[]
    produits : Produit[]
    fournisseurs : Fournisseur[]
    commandes : Commande[]
    admins : Utilisateur[]
    isLogin : boolean



  constructor(private router : Router, private adminService : AdminService, private apiService: ApiServiceService, private http : HttpClient) { }
  utils : Utilisateur[]
  ngOnInit(): void {
    if (this.apiService.currentUser == null) {
      this.isLogin = false
    } else {
      this.isLogin = true
    }
    console.log(this.adminService.mdpNC)
    this.adminService.loginForToken(this.apiService.currentUser.pseudo, this.adminService.mdpNC)
  }

  getAllFournisseurs() {
    this.getAllProduits();
    this.http.get('http://localhost:8080/api/fournisseurs').subscribe(
      (response : Fournisseur[]) => {
        this.fournisseurs = response;
      }
    )
    this.router.navigate(['./admin', 'modiffournisseur']).then();
  }

  getAllProduits() {
    this.router.navigate(['./admin', "modifproduit"]).then();
  }

  getAllUtilisateurs() {
    this.http.get('http://localhost:8080/api/utilisateurs').subscribe(
      (response : Utilisateur[]) => {
        this.utilisateurs = response;
      }
    )
    this.router.navigate(['./admin', 'modifuser']).then();
  }

  getAllAdmins() {
    this.http.get('http://localhost:8080/api/utilisateurs/admins').subscribe(
      (response : Utilisateur[]) => {
        this.admins = response;
      }
    )
    this.router.navigate(['./admin', 'admins']).then();
  }

  getAllCommandes() {
    this.router.navigate(['./admin', 'modifcommande']).then();
  }
}
