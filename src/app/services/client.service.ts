import { Injectable, signal } from '@angular/core';
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

@Injectable({ providedIn: 'root' })
export class ClientService {
  readonly clients = signal<string[]>([]);

  constructor() {
    const q = query(collection(db, 'clients'), orderBy('createdAt', 'asc'));
    onSnapshot(q, snapshot => {
      this.clients.set(snapshot.docs.map(doc => doc.data()['name'] as string));
    });
  }

  async add(name: string) {
    await addDoc(collection(db, 'clients'), {
      name,
      createdAt: new Date().toISOString(),
    });
  }
}
