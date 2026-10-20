import { Injectable, signal, computed, inject } from '@angular/core';
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ClientService } from './client.service';

export interface Order {
  id: string;
  client: string;
  garment: string;
  status: string;
  dueDate: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  readonly orders = signal<Order[]>([]);
  private clientService = inject(ClientService);

  readonly activeCount = computed(() =>
    this.orders().filter(o => o.status !== 'Delivered').length
  );

  readonly pendingFittingsCount = computed(() =>
    this.orders().filter(o => o.status === 'Fitting Ready').length
  );

  readonly deliveredThisMonth = computed(() => {
    const now = new Date();
    return this.orders().filter(o => {
      if (o.status !== 'Delivered') return false;
      const d = new Date(o.dueDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
  });

  constructor() {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    onSnapshot(q, snapshot => {
      this.orders.set(
        snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order))
      );
    });
  }

  async add(order: Omit<Order, 'id'>) {
    const clientDoc = this.clientService.clients().find(c => c.name === order.client);
    await addDoc(collection(db, 'orders'), { ...order, createdAt: serverTimestamp() });
    if (clientDoc) {
      await updateDoc(doc(db, 'clients', clientDoc.id), { orderCount: increment(1) });
    }
  }
}
