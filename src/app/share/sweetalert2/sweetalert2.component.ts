import { Component, Injectable, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sweetalert2',
  templateUrl: './sweetalert2.component.html',
  styleUrls: ['./sweetalert2.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class Sweetalert2Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public loading(activar){
    Swal.fire({
      html: "<div class='row loading'>"+
                "<div class='col-2'>"+
                    "<div class='spinner-border'></div>"+
                '</div>'+
                "<div class='col-10'>"+
                    "<p class='text-dark'>Procesando, espere por favor...</p>"+
                '</div>'+
            "</div>",    
      showCancelButton: false,
      showConfirmButton: false,
      width: '380px',
    });

    if(!activar){
      Swal.close();
    }
  }

  public showModalError(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#ea792d',
    })
  }


}
