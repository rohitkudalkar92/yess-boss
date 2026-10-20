import { Injectable, signal } from '@angular/core';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  where,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Client {
  id: string;
  name: string;
  phone: string;
  dob: string;
  orderCount?: number;
  createdAt: string;
  modifiedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ClientService {
  readonly clients = signal<Client[]>([]);
  private unsubscribe?: () => void;

  constructor() {
    this.fetch();
  }

  fetch(search = '') {
    this.unsubscribe?.();
    const constraints: QueryConstraint[] = [orderBy('name')];
    if (search.trim()) {
      const q = search.trim();
      constraints.push(where('name', '>=', q), where('name', '<=', q + '\uf8ff'));
    }
    this.unsubscribe = onSnapshot(
      query(collection(db, 'clients'), ...constraints),
      snapshot => this.clients.set(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Client)))
    );
  }

  async add(client: Omit<Client, 'id' | 'createdAt' | 'modifiedAt'>) {
    const now = new Date().toISOString();
    await addDoc(collection(db, 'clients'), { ...client, createdAt: now, modifiedAt: now });
  }

  async update(id: string, data: Omit<Client, 'id' | 'createdAt' | 'modifiedAt'>) {
    await updateDoc(doc(db, 'clients', id), { ...data, modifiedAt: new Date().toISOString() });
  }

  async delete(id: string) {
    await deleteDoc(doc(db, 'clients', id));
  }
}
