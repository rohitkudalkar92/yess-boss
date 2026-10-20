import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClientService {
  readonly clients = signal<string[]>([
    'Alex Morgan',
    'James Patel',
    'Omar Farooq',
    'David Nguyen',
    'Carlos Rivera',
    'Liam OBrien',
    'Tom Whitfield',
    'Ravi Kapoor',
    'Hassan Ali',
    'Marco Rossi',
    'Ben Carter',
    'Lucas Dupont',
    'Arjun Mehta',
    'Kwame Asante',
    'Noah Kim',
  ]);

  add(name: string) {
    this.clients.update(list => [...list, name]);
  }
}
