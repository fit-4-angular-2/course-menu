import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { Item } from './item';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let items: Item[] = [
      new Item('Grundlagen', 'Projekt erstellen, Arbeiten mit Angular CLI, Komponenten')
    ];
    return {items};
  }
}
