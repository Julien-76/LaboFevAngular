import { Fournisseur } from "./Fournisseur";

export interface Produit {

    id : number,
    name : String,
    description : String,
    categorie : String,
    dateEntree : Date,
    dateUpdate : Date,
    datePeremption : Date,
    prixAchat : number,
    quantite : number,
    imageProduit : String,
    tva : number,
    fournisseur : Fournisseur
}