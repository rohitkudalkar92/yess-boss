import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { Topbar } from './topbar/topbar';
import { Toast } from './components/toast/toast';
import { filter } from 'rxjs';
import { APP_ROUTES } from './constants/app-routes';
import { AppIcon } from './components/icon/icon';
import { IconName } from './enums/icon-name.enum';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Topbar, Toast, AppIcon],
  templateUrl: './app.html',
})
export class App {
  readonly routes = APP_ROUTES;
  readonly IconName = IconName;
  isLanding = false;
  showScrollTop = false;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLDivElement>;

  onScroll(e: Event) {
    this.showScrollTop = (e.target as HTMLElement).scrollTop > 200;
  }

  scrollToTop() {
    this.scrollContainer.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.isLanding = e.urlAfterRedirects.startsWith(`/${APP_ROUTES.LANDING}`);
      });
  }
}
