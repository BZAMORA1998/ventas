import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as jQuery from 'jquery'; 

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
  }


  booOpen=false;
  openOclose(booOpen){
    if(this.booOpen!=booOpen){
      this.openNav();
      this.booOpen=true;
    }else{
      this.closeNav();
      this.booOpen=false;
    }
  }
  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

}
