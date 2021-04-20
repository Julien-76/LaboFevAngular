import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Produit } from 'src/app/tables/Produit';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss']
})
export class ProduitsComponent implements OnInit {
  listeProduits : Array<Produit> = [];
  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    this.getAllProduits()
  }

  getAllProduits() {
    
    this.httpClient.get<Produit[]>('https://labofev.herokuapp.com/api/produits')
    .subscribe(
      (response) => {
        this.listeProduits = response;
        
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
