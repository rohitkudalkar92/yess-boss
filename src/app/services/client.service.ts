import { Injectable, signal } from '@angular/core';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Client {
  id: string;
  shopId: string;
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

  fetch(shopId: string) {
    this.unsubscribe?.();
    const q = query(collection(db, 'clients'), where('shopId', '==', shopId));
    this.unsubscribe = onSnapshot(q, snapshot =>
      this.clients.set(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Client)))
    );
  }

  async add(client: Omit<Client, 'id' | 'createdAt' | 'modifiedAt'>) {
    const now = new Date().toISOString();
    const ref = await addDoc(collection(db, 'clients'), { ...client, createdAt: now, modifiedAt: now });
    return ref.id;
  }

  async update(id: string, data: Omit<Client, 'id' | 'createdAt' | 'modifiedAt'>) {
    await updateDoc(doc(db, 'clients', id), { ...data, modifiedAt: new Date().toISOString() });
  }

  async delete(id: string) {
    await deleteDoc(doc(db, 'clients', id));
  }
}
