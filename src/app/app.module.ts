import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientJsonpModule, HttpClientModule, HttpParams, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FournisseursComponent } from './tablesComponents/fournisseurs/fournisseurs.component';
import { ProduitsComponent } from './tablesComponents/produits/produits.component';
import { ApiServiceService } from './services/api-service.service';
import { UtilisateursComponent } from './tablesComponents/utilisateurs/utilisateurs.component';
import { CommandesComponent } from './tablesComponents/commandes/commandes.component';
import { SigninComponent } from './tablesComponents/signin/signin.component';
import { HomeComponent } from './tablesComponents/home/home.component';
import { EspacepersoComponent } from './tablesComponents/espaceperso/espaceperso.component';
import { PannelAdminComponent } from './tablesComponents/pannel-admin/pannel-admin.component';
import { InterceptorService } from './tablesComponents/pannel-admin/interceptor.service';
import { ModUserComponent } from './tablesComponents/pannel-admin/childs/mod-user/mod-user.component';
import { ModProduitComponent } from './tablesComponents/pannel-admin/childs/mod-produit/mod-produit.component';
import { ModFournisseurComponent } from './tablesComponents/pannel-admin/childs/mod-fournisseur/mod-fournisseur.component';
import { AdminsComponent } from './tablesComponents/pannel-admin/childs/admins/admins.component';
import { ModifcommandeComponent } from './tablesComponents/pannel-admin/childs/modifcommande/modifcommande.component';
import { AjoutFournisseurComponent } from './tablesComponents/pannel-admin/childs/ajout-fournisseur/ajout-fournisseur.component';
import { AjoutProduitComponent } from './tablesComponents/pannel-admin/childs/ajout-produit/ajout-produit.component';

@NgModule({
  declarations: [
    AppComponent,
    FournisseursComponent,
    ProduitsComponent,
    UtilisateursComponent,
    CommandesComponent,
    SigninComponent,
    HomeComponent,
    EspacepersoComponent,
    PannelAdminComponent,
    ModUserComponent,
    ModProduitComponent,
    ModFournisseurComponent,
    AdminsComponent,
    ModifcommandeComponent,
    AjoutFournisseurComponent,
    AjoutProduitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, HttpClientJsonpModule, ReactiveFormsModule
  ],
  providers: [ApiServiceService, {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
