import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar-cmp',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule],
  templateUrl: './toolbar-cmp.component.html',
  styleUrl: './toolbar-cmp.component.sass'
})
export class ToolbarCmpComponent {

}
