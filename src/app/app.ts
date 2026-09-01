import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { Topbar } from './topbar/topbar';
import { Toast } from './components/toast/toast';
import { filter } from 'rxjs';
import { APP_ROUTES } from './constants/app-routes';
import { AppIcon } from './components/icon/icon';

export interface Order {
  id: string;
  client: string;
  garment: string;
  status: string;
  dueDate: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Topbar, Toast, AppIcon],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('yess-boss');
  readonly routes = APP_ROUTES;
  isLanding = false;

  constructor(private router: Router) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      this.isLanding = e.urlAfterRedirects.startsWith(`/${APP_ROUTES.LANDING}`);
    });
  }

  readonly orders: Order[] = [
    { id: '#ORD-1082', client: 'Alex Morgan',    garment: '3-Piece Suit',     status: 'In Stitching',  dueDate: 'Sep 04' },
    { id: '#ORD-1081', client: 'Sarah Jenkins',  garment: 'Evening Gown',     status: 'Fitting Ready', dueDate: 'Sep 02' },
    { id: '#ORD-1080', client: 'James Patel',    garment: 'Sherwani',         status: 'Delivered',     dueDate: 'Aug 30' },
    { id: '#ORD-1079', client: 'Priya Sharma',   garment: 'Lehenga',          status: 'In Cutting',    dueDate: 'Sep 07' },
    { id: '#ORD-1078', client: 'Omar Farooq',    garment: 'Kurta Pajama',     status: 'In Stitching',  dueDate: 'Sep 05' },
    { id: '#ORD-1077', client: 'Emily Clarke',   garment: 'Cocktail Dress',   status: 'Fitting Ready', dueDate: 'Sep 03' },
    { id: '#ORD-1076', client: 'David Nguyen',   garment: '2-Piece Suit',     status: 'Delivered',     dueDate: 'Aug 28' },
    { id: '#ORD-1075', client: 'Fatima Malik',   garment: 'Anarkali Suit',    status: 'In Cutting',    dueDate: 'Sep 10' },
    { id: '#ORD-1074', client: 'Carlos Rivera',  garment: 'Tuxedo',           status: 'In Stitching',  dueDate: 'Sep 08' },
    { id: '#ORD-1073', client: 'Aisha Bello',    garment: 'Kaftan',           status: 'Fitting Ready', dueDate: 'Sep 01' },
    { id: '#ORD-1072', client: 'Liam OBrien',    garment: 'Blazer',           status: 'Delivered',     dueDate: 'Aug 27' },
    { id: '#ORD-1071', client: 'Nadia Hassan',   garment: 'Saree Blouse',     status: 'In Stitching',  dueDate: 'Sep 06' },
    { id: '#ORD-1070', client: 'Tom Whitfield',  garment: 'Waistcoat',        status: 'In Cutting',    dueDate: 'Sep 09' },
    { id: '#ORD-1069', client: 'Mei Lin',        garment: 'Qipao',            status: 'Fitting Ready', dueDate: 'Sep 02' },
    { id: '#ORD-1068', client: 'Ravi Kapoor',    garment: 'Nehru Jacket',     status: 'Delivered',     dueDate: 'Aug 25' },
    { id: '#ORD-1067', client: 'Sophie Turner',  garment: 'Bridal Gown',      status: 'In Stitching',  dueDate: 'Sep 12' },
    { id: '#ORD-1066', client: 'Hassan Ali',     garment: 'Shalwar Kameez',   status: 'In Cutting',    dueDate: 'Sep 11' },
    { id: '#ORD-1065', client: 'Grace Okafor',   garment: 'Ankara Dress',     status: 'Fitting Ready', dueDate: 'Sep 04' },
    { id: '#ORD-1064', client: 'Marco Rossi',    garment: 'Linen Suit',       status: 'Delivered',     dueDate: 'Aug 22' },
    { id: '#ORD-1063', client: 'Yuki Tanaka',    garment: 'Kimono',           status: 'In Stitching',  dueDate: 'Sep 13' },
    { id: '#ORD-1062', client: 'Amara Diallo',   garment: 'Boubou',           status: 'In Cutting',    dueDate: 'Sep 14' },
    { id: '#ORD-1061', client: 'Ben Carter',     garment: 'Morning Coat',     status: 'Fitting Ready', dueDate: 'Sep 05' },
    { id: '#ORD-1060', client: 'Zara Ahmed',     garment: 'Gharara',          status: 'Delivered',     dueDate: 'Aug 20' },
    { id: '#ORD-1059', client: 'Lucas Dupont',   garment: 'Double-Breasted',  status: 'In Stitching',  dueDate: 'Sep 15' },
    { id: '#ORD-1058', client: 'Nia Williams',   garment: 'Peplum Dress',     status: 'In Cutting',    dueDate: 'Sep 16' },
    { id: '#ORD-1057', client: 'Arjun Mehta',    garment: 'Indo-Western',     status: 'Fitting Ready', dueDate: 'Sep 06' },
    { id: '#ORD-1056', client: 'Clara Schmidt',  garment: 'Dirndl',           status: 'Delivered',     dueDate: 'Aug 18' },
    { id: '#ORD-1055', client: 'Kwame Asante',   garment: 'Kente Suit',       status: 'In Stitching',  dueDate: 'Sep 17' },
    { id: '#ORD-1054', client: 'Isabella Ferri', garment: 'Pencil Skirt Set', status: 'In Cutting',    dueDate: 'Sep 18' },
    { id: '#ORD-1053', client: 'Noah Kim',       garment: 'Slim-Fit Suit',    status: 'Fitting Ready', dueDate: 'Sep 07' },
  ];

  statusClass(status: string): string {
    const map: Record<string, string> = {
      'In Stitching':  'text-amber-700 bg-amber-50 border-amber-200',
      'Fitting Ready': 'text-blue-700 bg-blue-50 border-blue-200',
      'Delivered':     'text-emerald-700 bg-emerald-50 border-emerald-200',
      'In Cutting':    'text-purple-700 bg-purple-50 border-purple-200',
    };
    return map[status] ?? 'text-slate-700 bg-slate-50 border-slate-200';
  }
}
