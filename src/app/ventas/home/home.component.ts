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
    this.translate.setDefaultLang(this.activeLang);
    this.data.photo="data:image/png;base64,"+this.data.photo;
    if(this.data.rolSistema!='ADM'){
      var rol=document.getElementById("rol");
      rol.className="nav-link enlace_desactivado";
    }

    $(function(){
      $(".dropdown-menu > li > a.trigger").on("click",function(e){
          var current=$(this).next();
          var grandparent=$(this).parent().parent();
          if($(this).hasClass('left-caret')||$(this).hasClass('right-caret'))
              $(this).toggleClass('right-caret left-caret');
          grandparent.find('.left-caret').not(this).toggleClass('right-caret left-caret');
          grandparent.find(".sub-menu:visible").not(current).hide();
          current.toggle();
          e.stopPropagation();
      });
      $(".dropdown-menu > li > a:not(.trigger)").on("click",function(){
          var root=$(this).closest('.dropdown');
          root.find('.left-caret').toggleClass('right-caret left-caret');
          root.find('.sub-menu:visible').hide();
      });
  });
  }

}
