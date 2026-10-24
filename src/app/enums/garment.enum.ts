export enum Garment {
  Shirt = 'Shirt',
  Pant = 'Pant',
}

export interface GarmentField {
  key: string;
  label: string;
  type: 'number' | 'select';
  options?: string[];
  maxLength?: number;
}

export const GARMENT_FIELDS: Record<Garment, GarmentField[]> = {
  [Garment.Shirt]: [
    { key: 'collar', label: 'Collar', type: 'number', maxLength: 3 },
    { key: 'chest', label: 'Chest', type: 'number', maxLength: 3 },
    { key: 'waist', label: 'Waist', type: 'number', maxLength: 3 },
    { key: 'shoulder', label: 'Shoulder', type: 'number', maxLength: 3 },
    { key: 'sleeve', label: 'Sleeve', type: 'number', maxLength: 3 },
    { key: 'length', label: 'Length', type: 'number', maxLength: 3 },
    { key: 'cuff', label: 'Cuff', type: 'number', maxLength: 3 },
  ],
  [Garment.Pant]: [
    { key: 'waist', label: 'Waist', type: 'number', maxLength: 3 },
    { key: 'hips', label: 'Hips', type: 'number', maxLength: 3 },
    { key: 'inseam', label: 'Inseam', type: 'number', maxLength: 3 },
    { key: 'thigh', label: 'Thigh', type: 'number', maxLength: 3 },
    { key: 'knee', label: 'Knee', type: 'number', maxLength: 3 },
    { key: 'bottom', label: 'Bottom', type: 'number', maxLength: 3 },
    { key: 'rise', label: 'Rise', type: 'number', maxLength: 3 },
  ],
};
