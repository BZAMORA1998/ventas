import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public activeLang =JSON.parse(localStorage.getItem("languaje"));

  constructor() { }

  ngOnInit(): void {
    
  }

}
