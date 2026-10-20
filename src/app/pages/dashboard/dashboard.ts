import { Component } from '@angular/core';
import { StatCard } from '../../components/stat-card/stat-card';
import { DataTable, TableColumn } from '../../components/data-table/data-table';

interface Order {
  id: string;
  client: string;
  garment: string;
  status: string;
  dueDate: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [StatCard, DataTable],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  readonly columns: TableColumn[] = [
    { key: 'id', label: 'Order' },
    { key: 'client', label: 'Client' },
    { key: 'garment', label: 'Garment' },
    { key: 'status', label: 'Status' },
    { key: 'dueDate', label: 'Due Date' },
  ];

  readonly orders: Order[] = [
    {
      id: '#ORD-1082',
      client: 'Michael Grant',
      garment: '3-Piece Suit',
      status: 'In Stitching',
      dueDate: 'Sep 04',
    },
    {
      id: '#ORD-1081',
      client: 'Daniel Osei',
      garment: 'Sherwani',
      status: 'Fitting Ready',
      dueDate: 'Sep 02',
    },
    {
      id: '#ORD-1080',
      client: 'Tariq Hussain',
      garment: 'Kurta Pajama',
      status: 'Delivered',
      dueDate: 'Aug 30',
    },
    {
      id: '#ORD-1079',
      client: 'Victor Mensah',
      garment: 'Tuxedo',
      status: 'In Cutting',
      dueDate: 'Sep 07',
    },
    {
      id: '#ORD-1078',
      client: 'Samuel Adeyemi',
      garment: 'Blazer',
      status: 'In Stitching',
      dueDate: 'Sep 05',
    },
    {
      id: '#ORD-1077',
      client: 'Patrick Nwosu',
      garment: 'Waistcoat',
      status: 'Fitting Ready',
      dueDate: 'Sep 03',
    },
    {
      id: '#ORD-1076',
      client: 'George Tanaka',
      garment: 'Nehru Jacket',
      status: 'Delivered',
      dueDate: 'Aug 28',
    },
    {
      id: '#ORD-1075',
      client: 'Bilal Chaudhry',
      garment: 'Shalwar Kameez',
      status: 'In Cutting',
      dueDate: 'Sep 10',
    },
    {
      id: '#ORD-1074',
      client: 'Felix Wagner',
      garment: 'Linen Suit',
      status: 'In Stitching',
      dueDate: 'Sep 08',
    },
    {
      id: '#ORD-1073',
      client: 'Andre Dubois',
      garment: 'Double-Breasted',
      status: 'Fitting Ready',
      dueDate: 'Sep 01',
    },
    {
      id: '#ORD-1072',
      client: 'Ethan Brooks',
      garment: 'Morning Coat',
      status: 'Delivered',
      dueDate: 'Aug 27',
    },
    {
      id: '#ORD-1071',
      client: 'Yusuf Diallo',
      garment: 'Kente Suit',
      status: 'In Stitching',
      dueDate: 'Sep 06',
    },
    {
      id: '#ORD-1070',
      client: 'Nathan Pierce',
      garment: 'Slim-Fit Suit',
      status: 'In Cutting',
      dueDate: 'Sep 09',
    },
    {
      id: '#ORD-1069',
      client: 'Raj Singhania',
      garment: 'Indo-Western Suit',
      status: 'Fitting Ready',
      dueDate: 'Sep 02',
    },
    {
      id: '#ORD-1068',
      client: 'Kofi Boateng',
      garment: '2-Piece Suit',
      status: 'Delivered',
      dueDate: 'Aug 25',
    },
    {
      id: '#ORD-1067',
      client: 'Ivan Petrov',
      garment: 'Tuxedo',
      status: 'In Stitching',
      dueDate: 'Sep 12',
    },
    {
      id: '#ORD-1066',
      client: 'Hamid Sultani',
      garment: 'Sherwani',
      status: 'In Cutting',
      dueDate: 'Sep 11',
    },
    {
      id: '#ORD-1065',
      client: 'Jerome Wallace',
      garment: 'Blazer',
      status: 'Fitting Ready',
      dueDate: 'Sep 04',
    },
    {
      id: '#ORD-1064',
      client: 'Matteo Ferrari',
      garment: '3-Piece Suit',
      status: 'Delivered',
      dueDate: 'Aug 22',
    },
    {
      id: '#ORD-1063',
      client: 'Darius Cole',
      garment: 'Waistcoat',
      status: 'In Stitching',
      dueDate: 'Sep 13',
    },
    {
      id: '#ORD-1062',
      client: 'Emeka Okafor',
      garment: 'Kurta Pajama',
      status: 'In Cutting',
      dueDate: 'Sep 14',
    },
    {
      id: '#ORD-1061',
      client: 'Stefan Müller',
      garment: 'Morning Coat',
      status: 'Fitting Ready',
      dueDate: 'Sep 05',
    },
    {
      id: '#ORD-1060',
      client: 'Javier Morales',
      garment: 'Linen Suit',
      status: 'Delivered',
      dueDate: 'Aug 20',
    },
    {
      id: '#ORD-1059',
      client: 'Tobias Richter',
      garment: 'Double-Breasted',
      status: 'In Stitching',
      dueDate: 'Sep 15',
    },
    {
      id: '#ORD-1058',
      client: 'Chidi Eze',
      garment: 'Nehru Jacket',
      status: 'In Cutting',
      dueDate: 'Sep 16',
    },
    {
      id: '#ORD-1057',
      client: 'Rohan Verma',
      garment: 'Indo-Western Suit',
      status: 'Fitting Ready',
      dueDate: 'Sep 06',
    },
    {
      id: '#ORD-1056',
      client: 'Lukas Becker',
      garment: 'Slim-Fit Suit',
      status: 'Delivered',
      dueDate: 'Aug 18',
    },
    {
      id: '#ORD-1055',
      client: 'Seun Adebayo',
      garment: 'Kente Suit',
      status: 'In Stitching',
      dueDate: 'Sep 17',
    },
    {
      id: '#ORD-1054',
      client: 'Faisal Qureshi',
      garment: 'Shalwar Kameez',
      status: 'In Cutting',
      dueDate: 'Sep 18',
    },
    {
      id: '#ORD-1053',
      client: 'Marcus Webb',
      garment: '2-Piece Suit',
      status: 'Fitting Ready',
      dueDate: 'Sep 07',
    },
  ];

  statusClass(status: string): string {
    const map: Record<string, string> = {
      'In Stitching': 'text-amber-700 bg-amber-50 border-amber-200',
      'Fitting Ready': 'text-blue-700 bg-blue-50 border-blue-200',
      Delivered: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      'In Cutting': 'text-purple-700 bg-purple-50 border-purple-200',
    };
    return map[status] ?? 'text-slate-700 bg-slate-50 border-slate-200';
  }
}
