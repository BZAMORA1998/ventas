import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
declare var $:any;

@Component({
  selector: 'app-checkbox-recursive-rol',
  templateUrl: './checkbox-recursive-rol.component.html',
  styleUrls: ['./checkbox-recursive-rol.component.css']
})
export class CheckboxRecursiveRolComponent implements OnInit {

  ngOnInit(): void {

  }

  public isCheckImg(valor,i){
    $(document).ready(function(){  
      console.log(`#check-${valor}-${i+1}`);
      if($(`#check-${valor}-${i}`).css('display') == 'none'){
        $(`#check-${valor}-${i}`).show();
        $(`#img-${valor}-${i}`).attr("src","../../../assets/img/signo-menos.svg");
        console.log("Entro");
      }else{
        $(`#check-${valor}-${i}`).hide();
        $(`#img-${valor}-${i}`).attr("src","../../../assets/img/mas.svg");
        console.log("Salio");
      }
     });
  }

  a:number;
  public chequearTodo(value):any{
     this.list.forEach(b => {
       this.a=this.a+1;

       if(b.children=[]){ 
          b.children=this.chequearTodo(value);
       }
     });

  }

  // its just list data from here down
  public list = [
    {
      i:0,
      title: 'great_grandparent',
      esCheck:true,
      children: [
        {
          i:0,
          title: 'childless_grandsibiling',
          esCheck:true,
          children: []
        },
        {
          i:0,
          title: 'grandparent',
          esCheck:true,
          children: [
            {
              i:0,
              title: 'childless_sibiling',
              esCheck:true,
              children: []
            },
            {
              i:0,
              title: 'another_childless_sibiling',
              esCheck:true,
              children: []
            },
            {
              i:0,
              title: 'parent',
              esCheck:true,
              children: [
                {
                  i:0,
                  title: 'child',
                  esCheck:true,
                  children: []
                },
                {
                  i:0,
                  title: 'another_child',
                  esCheck:true,
                  children: []
                },
              ]
            },
            {
              i:0,
              title: 'another_parent',
              esCheck:true,
              children: [
                {
                  i:0,
                  title: 'child',
                  esCheck:true,
                  children: []
                },
              ]
            },
          ]
        },
        {
          i:0,
          title: 'another_grandparent',
          esCheck:true,
          children: [
            {
              i:0,
              title: 'parent',
              esCheck:true,
              children: [
                {
                  i:0,
                  title: 'child',
                  esCheck:true,
                  children: []
                },
                {
                  i:0,
                  title: 'another_child',
                  esCheck:true,
                  children: []
                },
                {
                  i:0,
                  title: 'a third_child',
                  esCheck:true,
                  children: []
                },
                {
                  i:0,
                  title: 'teen_mother',
                  esCheck:true,
                  children: [
                    {
                      i:0,
                      title: 'accident',
                      esCheck:true,
                      children: []
                    },
                  ]
                },
              ]
            },
          ]
        },
      ]
    },
  ];
}

