import { Produit } from "./Produit";

export interface Fournisseur {

    id : number,
    entreprise : String,
    statutSocial : String,
    secteur : String,
    dateInsertion : Date,
    dateUpdate : Date,
    produits : Array<Produit>;
}