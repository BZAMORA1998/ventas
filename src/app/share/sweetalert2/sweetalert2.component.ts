import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
  }

  ngOnInit(): void {
  }

  public loading(activar){
    Swal.fire({
      html: "<div class='row loading'>"+
                "<div class='col-2 pt-2'>"+
                    "<div class='spinner-border'></div>"+
                '</div>'+
                "<div class='col-10 pt-2'>"+
                    "<p class='text-dark'>Procesando, espere por favor...</p>"+
                '</div>'+
            "</div>",    
      showCancelButton: false,
      showConfirmButton: false,
      width: '400px',
      padding:'5px'
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
      confirmButtonColor:'#007bff',
    })
  }

  public showModalConfirmacion(message){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      confirmButtonColor:'#007bff',
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        this.redirigirLogin();
      }
     });
  }

  public redirigirLogin(){
    setTimeout(()=>{
      window.location.reload();
    }, 100);
    return this._router.navigate(['../listar-usuarios']);
  }

}
