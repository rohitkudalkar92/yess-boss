import { Injectable, signal, computed } from '@angular/core';
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

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
    await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: serverTimestamp(),
    });
  }
}
