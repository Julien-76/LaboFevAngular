import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from './tablesComponents/commandes/commandes.component';
import { EspacepersoComponent } from './tablesComponents/espaceperso/espaceperso.component';
import { FournisseursComponent } from './tablesComponents/fournisseurs/fournisseurs.component';
import { HomeComponent } from './tablesComponents/home/home.component';
import { AdminsComponent } from './tablesComponents/pannel-admin/childs/admins/admins.component';
import { AjoutFournisseurComponent } from './tablesComponents/pannel-admin/childs/ajout-fournisseur/ajout-fournisseur.component';
import { AjoutProduitComponent } from './tablesComponents/pannel-admin/childs/ajout-produit/ajout-produit.component';
import { ModFournisseurComponent } from './tablesComponents/pannel-admin/childs/mod-fournisseur/mod-fournisseur.component';
import { ModProduitComponent } from './tablesComponents/pannel-admin/childs/mod-produit/mod-produit.component';
import { ModUserComponent } from './tablesComponents/pannel-admin/childs/mod-user/mod-user.component';
import { ModifcommandeComponent } from './tablesComponents/pannel-admin/childs/modifcommande/modifcommande.component';
import { PannelAdminComponent } from './tablesComponents/pannel-admin/pannel-admin.component';
import { ProduitsComponent } from './tablesComponents/produits/produits.component';
import { SigninComponent } from './tablesComponents/signin/signin.component';
import { UtilisateursComponent } from './tablesComponents/utilisateurs/utilisateurs.component';

const routes: Routes = [
  { path : 'fournisseurs', component : FournisseursComponent },
  { path : 'produits', component : ProduitsComponent},
  { path : 'signin', component : SigninComponent},
  { path : 'utilisateurs', component : UtilisateursComponent},
  { path : 'espaceperso', component : EspacepersoComponent},
  { path : 'commandes', component : CommandesComponent},
  { path : 'home', component : HomeComponent},
  { path : '', redirectTo : '/home', pathMatch : 'full'},
  { path : 'admin', component : PannelAdminComponent, children : [
      { path : 'modifuser', component : ModUserComponent },
      { path : 'modifproduit', component : ModProduitComponent},
      { path : 'modiffournisseur', component : ModFournisseurComponent},
      { path : 'admins', component : AdminsComponent},
      { path : 'modifcommande', component : ModifcommandeComponent},
      { path : 'ajoutfournisseur', component : AjoutFournisseurComponent},
      { path : 'ajoutproduit', component : AjoutProduitComponent}
  ]}
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
