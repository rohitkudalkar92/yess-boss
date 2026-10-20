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
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserRole } from '../enums/user-role.enum';

export interface User {
  id: string;
  username: string;
  password: string;
  role: UserRole;
  fullName: string;
  phone: string;
  email: string;
  isActive: boolean;
  token?: string;
  tokenExpiry?: string;
  createdAt: string;
  modifiedAt: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  readonly users = signal<User[]>([]);
  private unsubscribe?: () => void;

  constructor() {
    this.fetch();
  }

  fetch() {
    this.unsubscribe?.();
    this.unsubscribe = onSnapshot(
      query(collection(db, 'users'), orderBy('fullName')),
      snapshot => this.users.set(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as User)))
    );
  }

  async findByCredentials(username: string, password: string): Promise<User | null> {
    const snapshot = await getDocs(
      query(collection(db, 'users'), where('username', '==', username), where('password', '==', password), where('isActive', '==', true))
    );
    if (snapshot.empty) return null;
    const d = snapshot.docs[0];
    return { id: d.id, ...d.data() } as User;
  }

  async saveToken(id: string, token: string, tokenExpiry: string) {
    await updateDoc(doc(db, 'users', id), { token, tokenExpiry });
  }

  async clearToken(id: string) {
    await updateDoc(doc(db, 'users', id), { token: '', tokenExpiry: '' });
  }

  async findByToken(token: string): Promise<User | null> {
    const snapshot = await getDocs(
      query(collection(db, 'users'), where('token', '==', token), where('isActive', '==', true))
    );
    if (snapshot.empty) return null;
    const d = snapshot.docs[0];
    return { id: d.id, ...d.data() } as User;
  }

  async add(user: Omit<User, 'id' | 'createdAt' | 'modifiedAt'>) {
    const now = new Date().toISOString();
    await addDoc(collection(db, 'users'), { ...user, createdAt: now, modifiedAt: now });
  }

  async update(id: string, data: Omit<User, 'id' | 'createdAt' | 'modifiedAt'>) {
    await updateDoc(doc(db, 'users', id), { ...data, modifiedAt: new Date().toISOString() });
  }

  async delete(id: string) {
    await deleteDoc(doc(db, 'users', id));
  }
}
