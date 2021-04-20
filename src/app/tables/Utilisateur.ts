import { Adresse } from "./Adresse";
import { Commande } from "./Commande";
import { Produit } from "./Produit";


export interface Utilisateur {

    id : number,
    name : string,
    firstname : string,
    niveauAcces : string,
    pseudo : string,
    mdp : string,
    adresse : Adresse,
    commandes : Array<Commande>
}