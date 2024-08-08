import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statusbar-cmp',
  standalone: true,
  imports: [],
  templateUrl: './statusbar-cmp.component.html',
  styleUrl: './statusbar-cmp.component.sass'
})
export class StatusbarCmpComponent {

  @Input() editorApi: any;

  constructor() { }

}
