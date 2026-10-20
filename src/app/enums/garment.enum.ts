export enum Garment {
  Shirt = 'Shirt',
  Pant = 'Pant',
}

export interface GarmentField {
  key: string;
  label: string;
  type: 'number' | 'select';
  placeholder?: string;
  options?: string[];
}

export const GARMENT_FIELDS: Record<Garment, GarmentField[]> = {
  [Garment.Shirt]: [
    { key: 'collar', label: 'Collar (in)', type: 'number', placeholder: '15' },
    { key: 'chest', label: 'Chest (in)', type: 'number', placeholder: '40' },
    { key: 'waist', label: 'Waist (in)', type: 'number', placeholder: '34' },
    { key: 'shoulder', label: 'Shoulder (in)', type: 'number', placeholder: '18' },
    { key: 'sleeve', label: 'Sleeve (in)', type: 'number', placeholder: '25' },
    { key: 'length', label: 'Length (in)', type: 'number', placeholder: '30' },
    { key: 'cuff', label: 'Cuff (in)', type: 'number', placeholder: '9' },
    {
      key: 'fit',
      label: 'Fit Style',
      type: 'select',
      options: ['Slim Fit', 'Regular Fit', 'Relaxed Fit'],
    },
  ],
  [Garment.Pant]: [
    { key: 'waist', label: 'Waist (in)', type: 'number', placeholder: '34' },
    { key: 'hips', label: 'Hips (in)', type: 'number', placeholder: '42' },
    { key: 'inseam', label: 'Inseam (in)', type: 'number', placeholder: '32' },
    { key: 'thigh', label: 'Thigh (in)', type: 'number', placeholder: '24' },
    { key: 'knee', label: 'Knee (in)', type: 'number', placeholder: '18' },
    { key: 'bottom', label: 'Bottom (in)', type: 'number', placeholder: '16' },
    { key: 'rise', label: 'Rise (in)', type: 'number', placeholder: '11' },
    {
      key: 'fit',
      label: 'Fit Style',
      type: 'select',
      options: ['Slim Fit', 'Regular Fit', 'Relaxed Fit'],
    },
  ],
};
