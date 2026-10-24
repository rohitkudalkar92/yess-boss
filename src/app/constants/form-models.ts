import { Garment } from '../enums/garment.enum';

export interface ClientForm {
  name: string;
  phone: string;
  dob: string;
}

export interface OrderForm {
  clientId: string;
  phone: string;
  garment: Garment | '';
  status: string;
  dueDate: string;
  isPaid: boolean;
}

export const defaultClientForm = (): ClientForm => ({ name: '', phone: '', dob: '' });

export const defaultOrderForm = (): OrderForm => ({
  clientId: '',
  phone: '',
  garment: '',
  status: 'In Cutting',
  dueDate: '',
  isPaid: false,
});
