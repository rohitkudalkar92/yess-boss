import { Injectable, signal, computed } from '@angular/core';
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  runTransaction,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

export interface Order {
  id: string;
  orderId: number;
  shopId: string;
  clientId: string;
  phone: string;
  garment: string;
  status: string;
  dueDate: string;
  isPaid: boolean;
  createdAt: Timestamp | null;
  modifiedAt: Timestamp | null;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  readonly orders = signal<Order[]>([]);
  private unsubscribe?: () => void;

  readonly activeCount = computed(() =>
    this.orders().filter(o => o.status !== 'Delivered').length
  );

  readonly pendingFittingsCount = computed(() =>
    this.orders().filter(o => o.status === 'Fitting Ready').length
  );

  readonly missedDueDate = computed(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.orders().filter(o =>
      o.status !== 'Delivered' && new Date(o.dueDate) < today
    ).length;
  });

  readonly deliveredThisMonth = computed(() => {
    const now = new Date();
    return this.orders().filter(o => {
      if (o.status !== 'Delivered') return false;
      const d = new Date(o.dueDate);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;
  });

  constructor() {}

  fetch(_shopId: string) {
    this.unsubscribe?.();
    this.unsubscribe = onSnapshot(collection(db, 'orders'), snapshot => {
      this.orders.set(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
    });
  }

  async add(order: Omit<Order, 'id' | 'orderId' | 'createdAt' | 'modifiedAt'>) {
    const counterRef = doc(db, 'meta', 'orderCounter');

    const orderId = await runTransaction(db, async tx => {
      const snap = await tx.get(counterRef);
      const next = snap.exists() ? snap.data()['lastOrderId'] + 1 : 1001;
      tx.set(counterRef, { lastOrderId: next }, { merge: true });
      return next;
    });

    await addDoc(collection(db, 'orders'), {
      ...order,
      orderId,
      createdAt: serverTimestamp(),
      modifiedAt: serverTimestamp(),
    });

    if (order.clientId) {
      await updateDoc(doc(db, 'clients', order.clientId), { orderCount: increment(1) });
    }
  }

  async update(id: string, changes: Partial<Omit<Order, 'id' | 'orderId' | 'createdAt'>>) {
    await updateDoc(doc(db, 'orders', id), { ...changes, modifiedAt: serverTimestamp() });
  }
}
