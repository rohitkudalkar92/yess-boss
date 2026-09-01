import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NewOrderModal } from '../components/new-order-modal/new-order-modal';

@Component({
  selector: 'app-topbar',
  imports: [NewOrderModal, RouterLink, RouterLinkActive],
  templateUrl: './topbar.html',
})
export class Topbar {
  showModal = false;
  showSidebar = false;
}
