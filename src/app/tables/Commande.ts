import { Produit } from "./Produit";
import { Utilisateur } from "./Utilisateur";


export interface Commande {

    id : number,
    reference : String,
    dateCreation : Date,
    estPaye : boolean,
    moyenDePayement : String,
    produits : Array<Produit>,
    utilisateur : Utilisateur;

}