import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-infobar-cmp',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './infobar-cmp.component.html',
  styleUrl: './infobar-cmp.component.scss'
})
export class InfobarCmpComponent {

  constructor() { }

}
