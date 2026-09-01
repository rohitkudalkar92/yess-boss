import { Component } from '@angular/core';
import { DataTable, TableColumn } from '../../components/data-table/data-table';

interface Measurement {
  client: string;
  phone: string;
  garment: string;
  chest: number;
  waist: number;
  hips: number;
  shoulder: number;
  length: number;
  createdAt: string;
  updatedOn: string;
}

@Component({
  selector: 'app-client-measurements',
  imports: [DataTable],
  templateUrl: './client-measurements.html',
})
export class ClientMeasurements {
  readonly columns: TableColumn[] = [
    { key: 'client',    label: 'Client'   },
    { key: 'phone',     label: 'Phone'    },
    { key: 'garment',   label: 'Garment'  },
    { key: 'chest',     label: 'Chest'    },
    { key: 'waist',     label: 'Waist'    },
    { key: 'hips',      label: 'Hips'     },
    { key: 'shoulder',  label: 'Shoulder' },
    { key: 'length',    label: 'Length'   },
    { key: 'createdAt', label: 'Created'  },
    { key: 'updatedOn', label: 'Updated'  },
  ];

  readonly measurements: Measurement[] = [
    { client: 'Alex Morgan',    phone: '+1-202-555-0141', garment: '3-Piece Suit',      chest: 40, waist: 34, hips: 42, shoulder: 18, length: 30, createdAt: 'Jul 10', updatedOn: 'Aug 20' },
    { client: 'James Patel',    phone: '+1-404-555-0193', garment: 'Sherwani',          chest: 42, waist: 36, hips: 44, shoulder: 19, length: 46, createdAt: 'Jun 28', updatedOn: 'Aug 18' },
    { client: 'Omar Farooq',    phone: '+1-614-555-0128', garment: 'Kurta Pajama',      chest: 44, waist: 38, hips: 46, shoulder: 20, length: 44, createdAt: 'Jun 05', updatedOn: 'Aug 15' },
    { client: 'David Nguyen',   phone: '+1-816-555-0175', garment: '2-Piece Suit',      chest: 38, waist: 32, hips: 40, shoulder: 17, length: 29, createdAt: 'Jun 12', updatedOn: 'Aug 10' },
    { client: 'Carlos Rivera',  phone: '+1-206-555-0149', garment: 'Tuxedo',            chest: 41, waist: 35, hips: 43, shoulder: 18, length: 31, createdAt: 'Aug 10', updatedOn: 'Sep 01' },
    { client: 'Liam OBrien',    phone: '+1-407-555-0187', garment: 'Blazer',            chest: 43, waist: 37, hips: 45, shoulder: 19, length: 28, createdAt: 'May 18', updatedOn: 'Aug 08' },
    { client: 'Tom Whitfield',  phone: '+1-603-555-0198', garment: 'Waistcoat',         chest: 39, waist: 33, hips: 41, shoulder: 17, length: 22, createdAt: 'May 30', updatedOn: 'Aug 05' },
    { client: 'Ravi Kapoor',    phone: '+1-803-555-0145', garment: 'Nehru Jacket',      chest: 40, waist: 34, hips: 42, shoulder: 18, length: 26, createdAt: 'May 10', updatedOn: 'Aug 03' },
    { client: 'Hassan Ali',     phone: '+1-502-555-0112', garment: 'Shalwar Kameez',    chest: 43, waist: 37, hips: 45, shoulder: 19, length: 44, createdAt: 'Aug 15', updatedOn: 'Sep 02' },
    { client: 'Marco Rossi',    phone: '+1-702-555-0121', garment: 'Linen Suit',        chest: 39, waist: 33, hips: 41, shoulder: 17, length: 30, createdAt: 'Jul 22', updatedOn: 'Aug 27' },
    { client: 'Ben Carter',     phone: '+1-305-555-0163', garment: 'Morning Coat',      chest: 41, waist: 35, hips: 43, shoulder: 18, length: 32, createdAt: 'Jun 20', updatedOn: 'Aug 12' },
    { client: 'Lucas Dupont',   phone: '+1-917-555-0136', garment: 'Double-Breasted',   chest: 42, waist: 36, hips: 44, shoulder: 19, length: 31, createdAt: 'Aug 01', updatedOn: 'Aug 30' },
    { client: 'Arjun Mehta',    phone: '+1-512-555-0167', garment: 'Indo-Western Suit', chest: 40, waist: 34, hips: 42, shoulder: 18, length: 45, createdAt: 'Jul 20', updatedOn: 'Aug 25' },
    { client: 'Kwame Asante',   phone: '+1-404-555-0155', garment: 'Kente Suit',        chest: 44, waist: 38, hips: 46, shoulder: 20, length: 30, createdAt: 'May 18', updatedOn: 'Aug 08' },
    { client: 'Noah Kim',       phone: '+1-303-555-0182', garment: 'Slim-Fit Suit',     chest: 37, waist: 31, hips: 39, shoulder: 17, length: 29, createdAt: 'Jul 15', updatedOn: 'Aug 22' },
  ];
}
