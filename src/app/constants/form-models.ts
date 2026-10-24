import { Garment } from '../enums/garment.enum';

export interface ClientForm {
  name: string;
  phone: string;
  dob: string;
}

export interface OrderForm {
  client: string;
  phone: string;
  garment: Garment | '';
  status: string;
  dueDate: string;
  isPaid: boolean;
}

export const defaultClientForm = (): ClientForm => ({ name: '', phone: '', dob: '' });

export const defaultOrderForm = (): OrderForm => ({
  client: '',
  phone: '',
  garment: '',
  status: 'In Cutting',
  dueDate: '',
  isPaid: false,
});
