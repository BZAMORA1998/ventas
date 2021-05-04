import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
declare var $:any;

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-checkbox-recursive',
  templateUrl: './checkbox-recursive.component.html',
  styleUrls: ['./checkbox-recursive.component.css']
})
export class CheckboxRecursiveComponent implements OnInit {

  ngOnInit(): void {

  }

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'}
    ]
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach(t => t.completed = completed);
  }

  public isCheck(valor,i){
    $(document).ready(function(){  
      console.log(`#check-${valor}-${i+1}`);
      if($(`#check-${valor}-${i}`).css('display') == 'none'){
        $(`#check-${valor}-${i}`).show();
        console.log("Entro");
      }else{
        $(`#check-${valor}-${i}`).hide();
        console.log("Salio");
      }
     });
  }

  // its just list data from here down
  public list = [
    {
      title: 'great_grandparent',
      children: [
        {
          title: 'childless_grandsibiling',
          children: []
        },
        {
          title: 'grandparent',
          children: [
            {
              title: 'childless_sibiling',
              children: []
            },
            {
              title: 'another_childless_sibiling',
              children: []
            },
            {
              title: 'parent',
              children: [
                {
                  title: 'child',
                  children: []
                },
                {
                  title: 'another_child',
                  children: []
                },
              ]
            },
            {
              title: 'another_parent',
              children: [
                {
                  title: 'child',
                  children: []
                },
              ]
            },
          ]
        },
        {
          title: 'another_grandparent',
          children: [
            {
              title: 'parent',
              children: [
                {
                  title: 'child',
                  children: []
                },
                {
                  title: 'another_child',
                  children: []
                },
                {
                  title: 'a third_child',
                  children: []
                },
                {
                  title: 'teen_mother',
                  children: [
                    {
                      title: 'accident',
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

