import { Component, Input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  templateUrl: './logo.html',
})
export class AppLogo {
  @Input({ transform: booleanAttribute }) light = false;
}
