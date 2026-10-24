export enum Garment {
  Shirt = 'Shirt',
  Pant = 'Pant',
}

export interface GarmentField {
  key: string;
  label: string;
  type: 'number' | 'select';
  options?: string[];
}

export const GARMENT_FIELDS: Record<Garment, GarmentField[]> = {
  [Garment.Shirt]: [
    { key: 'collar', label: 'Collar', type: 'number' },
    { key: 'chest', label: 'Chest', type: 'number' },
    { key: 'waist', label: 'Waist', type: 'number' },
    { key: 'shoulder', label: 'Shoulder', type: 'number' },
    { key: 'sleeve', label: 'Sleeve', type: 'number' },
    { key: 'length', label: 'Length', type: 'number' },
    { key: 'cuff', label: 'Cuff', type: 'number' },
  ],
  [Garment.Pant]: [
    { key: 'waist', label: 'Waist', type: 'number' },
    { key: 'hips', label: 'Hips', type: 'number' },
    { key: 'inseam', label: 'Inseam', type: 'number' },
    { key: 'thigh', label: 'Thigh', type: 'number' },
    { key: 'knee', label: 'Knee', type: 'number' },
    { key: 'bottom', label: 'Bottom', type: 'number' },
    { key: 'rise', label: 'Rise', type: 'number' },
  ],
};
