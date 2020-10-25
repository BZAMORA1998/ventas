import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public data:any;
  public activeLang =JSON.parse(localStorage.getItem("languaje"));

  constructor( private translate: TranslateService) { }

  ngOnInit(): void {
    this.data=JSON.parse(localStorage.getItem('data'));
    this.translate.setDefaultLang(this.activeLang);
  }

}
