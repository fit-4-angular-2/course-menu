import { Component } from '@angular/core';

import { MDL_DIRECTIVES } from 'angular2-mdl';


class Item {
  title: string;
  explanation: string;
  selected: boolean;

  constructor(title: string, explanation: string, selected: boolean = false) {
    this.title = title;
    this.explanation = explanation;
    this.selected = selected;
  }

  public toggle() {
    this.selected = !this.selected;
  }
}

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ MDL_DIRECTIVES ]
})
export class HomeComponent {

  public items: Item[] = [
    new Item('Grundlagen', 'Projekt erstellen, Arbeiten mit Angular CLI, Komponenten')
  ];

  public toggleItem(item: Item) {
    item.toggle();
  }
}
