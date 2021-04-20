import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/tables/Utilisateur';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  admins : Utilisateur[] = []

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/api/utilisateurs/admins').subscribe(
      (response : Utilisateur[])  => {
        this.admins = response
      }
    )
  }

}
