import { InMemoryDbService } from 'angular2-in-memory-web-api';
import { Item } from './item';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let items: Item[] = [
      new Item('Grundlagen', 'Projekte mit Angular CLI, Templates, Komponenten, Dependency Injection, Services, Routing, Http-Requests.'),
      new Item('Aufbaukurs', 'Lifecycle Hooks, Bibliotheken einbinden, Komponenten, Direktiven, Pipes, Formulare, REST.'),
      new Item('Testen', 'Unit-Tests (Jasmine, Karma, Komponenten, Pipes, Services), e2e-Tests (Protractor, Selenium).'),
      new Item('Server-Kommunikation', 'REST, Promises, Observables, Binärdaten.'),
      new Item('Aufbaukurs 2', 'Zones, Change Detection Strategien, Multiprovider')
    ];
    return {items};
  }
}
